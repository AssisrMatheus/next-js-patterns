import { makeSchema } from "nexus";
import path from "path";

import * as Types from "./types";

export const schema = makeSchema({
  types: [Types],
  outputs: {
    // The path to the auto generated schema
    schema: path.join(process.cwd(), "generated/schema.graphql"),
    // The path to the auto generated typescript types
    typegen: path.join(process.cwd(), "generated/nexus.d.ts"),
  },
  // contextType: {
  //   module: path.join(__dirname, "../typings/context.d.ts"),
  //   export: "Context",
  // },
  // prettierConfig: require.resolve("../../.prettierrc.js"),
});
