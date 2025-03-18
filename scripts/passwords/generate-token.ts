import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: ".env", debug: true });

/**
 * Generate a token for a user ID
 * @param userId
 * @returns token
 *
 * Ex: npm run generate-token 'clr5r344g00004gb76n0jpj36'
 *
 * Note: Must use quotes around args. Using double quotes will strip anything after a $ sign, so use single quotes
 */
async function main() {
  const userId = process.argv[2];

  if (!userId) {
    console.error("No user ID provided");
    process.exit(1);
  }

  console.log("user ID entered:", userId);
  console.log("jwt secret:", process.env.AUTH_SECRET);

  const token = jwt.sign({ userId }, process.env.AUTH_SECRET ?? "");

  console.log("token:", token);
  process.exit(0);
}

main();
