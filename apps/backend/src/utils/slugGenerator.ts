import { customAlphabet } from "nanoid";

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const nanoid = customAlphabet(alphabet, 8);

export function generateSlug() {
  return nanoid();
}
