import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/api/private/graphql",
  documents: ["src/ui/**/*.graphql"],
  generates: {
    "src/server/generated/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
