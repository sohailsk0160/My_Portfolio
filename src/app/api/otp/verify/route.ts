import { NextRequest, NextResponse } from "next/server";
import { twilioVerify } from "@/lib/twilio";
import { validateIndianPhone, formatPhoneForTwilio } from "@/lib/phoneValidation";

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, otp } = await request.json();

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
    const verificationCheck = await twilioVerify.verificationChecks.create({
      to: formattedPhone,
      code: otp,
    });

    if (verificationCheck.status === "approved") {
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
