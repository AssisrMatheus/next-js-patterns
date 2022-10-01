import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/api/graphql",
  documents: [
    "pages/**/*.{graphql,tsx,ts}",
    "!pages/api/**/*.{graphql,tsx,ts}",
  ],
  generates: {
    "./generated/gql": {
      preset: "client",
      hooks: {
        afterAllFileWrite: "prettier --write",
        afterOneFileWrite: "next lint --fix --file",
      },
      plugins: [
        "typescript",
        // "typescript-operations",
        // "typescript-react-apollo",
      ],
    },
    // "./generated/graphql.schema.json": {
    //   plugins: ["introspection"],
    // },
  },
};

export default config;
