import twilio from "twilio";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let twilioVerifyService: any = null;

export function getTwilioVerify() {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_VERIFY_SERVICE_SID) {
    throw new Error("Missing Twilio environment variables: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, or TWILIO_VERIFY_SERVICE_SID");
  }

  if (!twilioVerifyService) {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    twilioVerifyService = client.verify.v2.services(
      process.env.TWILIO_VERIFY_SERVICE_SID
    );
  }

  return twilioVerifyService;
}
