export const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

// Accepts UK and international formats: +44 7123 456789, 07123456789, +1 555 000 0000, etc.
export const PHONE_REGEX = /^(\+?[\d\s\-().]{7,20})$/;

export function validateEmail(email: string): string {
  if (!email) return "Email is required";
  if (!EMAIL_REGEX.test(email)) return "Enter a valid email address";
  return "";
}

export function validatePhone(phone: string): string {
  if (!phone) return "Phone number is required";
  if (!PHONE_REGEX.test(phone)) return "Enter a valid phone number";
  return "";
}
