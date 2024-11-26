export function validateKenyanPhoneNumber(phone: string): { isValid: boolean; formatted: string } {
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid Kenyan format
  const regex = /^(?:254|\+254|0)?([17](0|1|2|4|5|6|7|8|9)\d{7})$/;
  const match = cleaned.match(regex);

  if (!match) {
    return { isValid: false, formatted: phone };
  }

  // Format to international format (254...)
  const formatted = '254' + match[1];
  return { isValid: true, formatted };
}