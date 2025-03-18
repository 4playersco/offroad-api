import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config({ path: ".env", debug: true });

/**
 * Compare a plain password to a hashed password
 * @param plainPlassword
 * @param hashedPassword
 * @returns boolean
 *
 * Ex: npm run compare-pw 'password' '$2a$10'
 *
 * Note: Must use quotes around args. Using double quotes will strip anything after a $ sign, so use single quotes
 */
async function main() {
  const plainPlassword = process.argv[2];
  const hashedPassword = process.argv[3];

  if (!plainPlassword) {
    console.error("No plain password provided");
    process.exit(1);
  }

  if (!hashedPassword) {
    console.error("No hashed password provided");
    process.exit(1);
  }

  console.log("plain password entered:", plainPlassword);
  console.log("hashed password entered:", hashedPassword);

  // Hash the new password
  const valid = bcrypt.compare(plainPlassword, hashedPassword);

  console.log("valid:", valid);
  process.exit(0);
}

main();
