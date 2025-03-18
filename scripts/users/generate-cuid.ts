import cuid from "@bugsnag/cuid";

/**
 * Generate a new CUID
 * @param {number} Number of CUIDs to generate
 * @returns cuid
 * @default 1
 *
 * Ex: npm run generate-cuid 3
 * Ex: npm run generate-cuid
 */
async function main() {
  console.log("cuid:");
  const length =
    process.argv[2] && !isNaN(Number(process.argv[2]))
      ? Number(process.argv[2])
      : 1;

  for (let i = 0; i < length; i++) {
    console.log(cuid());
  }

  console.log();
  process.exit(0);
}

main();
