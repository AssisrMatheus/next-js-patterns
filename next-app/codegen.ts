import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/api/graphql",
  documents: [
    "pages/**/*.{graphql,tsx,ts}",
    "!pages/api/**/*.{graphql,tsx,ts}",
    "nexus/**/*.{graphql,tsx,ts}",
  ],
  generates: {
    "./generated/gql": {
      preset: "client",
      hooks: {
        afterAllFileWrite: ["prettier --write", "next lint --fix"],
      },
      plugins: [],
    },
  },
};

export default config;
