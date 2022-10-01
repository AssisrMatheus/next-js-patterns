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
      plugins: [
        "typescript",
        // Not needed anymore since the new method already automatically types the query
        // "typescript-operations",
        // Not needed anymore since the new method already automatically types the query
        // "typescript-react-apollo",
      ],
    },
    // "./generated/graphql.schema.json": {
    //   plugins: ["introspection"],
    // },
  },
};

export default config;
