import twilio from "twilio";

if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_VERIFY_SERVICE_SID) {
  throw new Error("Missing Twilio environment variables");
}

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const twilioVerify = client.verify.v2.services(
  process.env.TWILIO_VERIFY_SERVICE_SID
);

export default client;
