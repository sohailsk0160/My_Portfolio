import { NextRequest, NextResponse } from "next/server";
import { getTwilioVerify } from "@/lib/twilio";
import { validateIndianPhone, formatPhoneForTwilio } from "@/lib/phoneValidation";

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber } = await request.json();

    // Validate phone number
    if (!phoneNumber) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    if (!validateIndianPhone(phoneNumber)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit Indian phone number" },
        { status: 400 }
      );
    }

    // Format phone number to E.164 format
    const formattedPhone = formatPhoneForTwilio(phoneNumber);

    // Send OTP via Twilio Verify
    const verification = await getTwilioVerify().verifications.create({
      to: formattedPhone,
      channel: "sms",
    });

    return NextResponse.json(
      {
        success: true,
        message: `OTP sent to +91${phoneNumber}`,
        sid: verification.sid,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("OTP Send Error:", error);

    // Handle specific Twilio errors
    if (error instanceof Error) {
      if (error.message.includes("rate limit")) {
        return NextResponse.json(
          { error: "Too many attempts. Please try again later." },
          { status: 429 }
        );
      }

      if (error.message.includes("invalid")) {
        return NextResponse.json(
          { error: "Invalid phone number" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to send OTP. Please try again." },
      { status: 500 }
    );
  }
}
