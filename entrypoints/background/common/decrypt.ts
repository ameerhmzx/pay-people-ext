import CryptoJS from "crypto-js";

const KEY = "4512631236589784";

/**
 * Decrypt the encrypted responses from the API
 * @param input
 */
export function decrypt(input: string): string {
  // Helper function to check if a string is valid JSON
  const isJson = (str: string): boolean => {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  };

  const iv = CryptoJS.enc.Utf8.parse(KEY);

  // If the input is valid JSON, return it as-is
  if (isJson(input)) {
    return input;
  }

  // Otherwise, attempt to decrypt the input
  const decrypted = CryptoJS.AES.decrypt(input, iv, {
    keySize: 16,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // Convert the decrypted data to a UTF-8 string and return it
  return decrypted.toString(CryptoJS.enc.Utf8);
}
