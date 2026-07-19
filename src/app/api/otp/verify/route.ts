import { NextRequest, NextResponse } from "next/server";
import { getTwilioVerify } from "@/lib/twilio";
import { validateIndianPhone, formatPhoneForTwilio } from "@/lib/phoneValidation";
import { getDb } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, otp, deviceId } = await request.json();

    // Validate inputs
    if (!phoneNumber || !otp) {
      return NextResponse.json(
        { error: "Phone number and OTP are required" },
        { status: 400 }
      );
    }

    if (!validateIndianPhone(phoneNumber)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { error: "OTP must be 6 digits" },
        { status: 400 }
      );
    }

    // Format phone number
    const formattedPhone = formatPhoneForTwilio(phoneNumber);

    // Verify OTP via Twilio Verify
    const verificationCheck = await getTwilioVerify().verificationChecks.create({
      to: formattedPhone,
      code: otp,
    });

    if (verificationCheck.status === "approved") {
      // Persist the successfully verified number against its device.
      try {
        const formattedNumber = `+91${phoneNumber}`;
        const db = await getDb();
        const now = new Date();

        // Record every verification event (history of verified numbers).
        await db.collection("verifiedNumbers").updateOne(
          {
            phoneNumber: formattedNumber,
            deviceId: typeof deviceId === "string" ? deviceId : null,
          },
          {
            $setOnInsert: { firstVerifiedAt: now },
            $set: { lastVerifiedAt: now },
            $inc: { verifyCount: 1 },
          },
          { upsert: true }
        );

        // Also tag the device with its most recently verified number.
        if (typeof deviceId === "string" && deviceId.length > 0 && deviceId.length <= 64) {
          await db.collection("devices").updateOne(
            { deviceId },
            {
              $set: { verifiedNumber: formattedNumber, verifiedAt: now },
              $addToSet: { verifiedNumbers: formattedNumber },
            },
            { upsert: true }
          );
        }
      } catch (dbError) {
        // Don't fail verification if persistence has an issue.
        console.error("Failed to store verified number:", dbError);
      }

      return NextResponse.json(
        {
          success: true,
          message: "OTP verified successfully!",
          verified: true,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 401 }
      );
    }
  } catch (error: unknown) {
    console.error("OTP Verify Error:", error);

    if (error instanceof Error) {
      if (error.message.includes("not found")) {
        return NextResponse.json(
          { error: "OTP expired. Please request a new one." },
          { status: 401 }
        );
      }

      if (error.message.includes("rate limit")) {
        return NextResponse.json(
          { error: "Too many attempts. Please try again later." },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to verify OTP. Please try again." },
      { status: 500 }
    );
  }
}
