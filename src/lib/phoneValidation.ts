/**
 * Validates Indian phone numbers (10 digits)
 */
export const validateIndianPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length === 10 && /^\d{10}$/.test(cleaned);
};

/**
 * Formats phone number to E.164 format for Twilio
 * Input: "8850314221" or "918850314221"
 * Output: "+918850314221"
 */
export const formatPhoneForTwilio = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");

  // If already has country code
  if (cleaned.startsWith("91") && cleaned.length === 12) {
    return `+${cleaned}`;
  }

  // If 10 digits (just the number)
  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  }

  throw new Error("Invalid phone number format");
};
