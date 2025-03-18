import cookie, { type CookieSerializeOptions } from "cookie";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: ".env", debug: true });

const defaultTokenSettings: Partial<CookieSerializeOptions> = {
  httpOnly: true,
  secure: false,
  sameSite: "none",
  maxAge: 60 * 60 * 24 * 365, // 1 year
};

// cors: Access-Control-Allow-Origin: https://studio.apollographql.com
// Access-Control-Allow-Credentials: true

/**
 * Generate a token for a user ID
 * @param userId
 * @returns token
 *
 * Ex: npm run generate-cookie 'clr5r344g00004gb76n0jpj36'
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
  const generatedCookie = cookie.serialize(
    "token",
    token,
    defaultTokenSettings
  );

  console.log("cookie:", generatedCookie);
  process.exit(0);
}

main();
