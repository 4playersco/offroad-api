import dotenv from "dotenv";
dotenv.config({ path: ".env", debug: true });

import getHash from "../../src/server/lib/get-hash";
import { HASH_SECRET } from "../../src/server/constants";

/**
 * Generate hashed password
 * @param password
 * @returns hashed password
 *
 * Ex: npm run generate-pw 'password'
 *
 * Note: Must use quotes around args. Using double quotes will strip anything after a $ sign, so use single quotes
 */
async function main() {
  const password = process.argv[2];

  console.log("hash secret:", HASH_SECRET);

  if (!password) {
    console.error("No password provided");
    process.exit(1);
  }

  console.log("password entered:", password);

  // Hash the new password
  const hash = await getHash(password);
  console.log("hash:", hash);
  process.exit(0);
}

main();
