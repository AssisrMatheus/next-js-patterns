import { optionalAuth } from "../lib/next-auth/auth";
import { UnpackPromise } from "./helpers";

// This is the type that will be used for the "context" variable for all resolvers.
// If changing anything here, don't forget to generate types again with "npm run nexus"!
export type Context =
  | {
      session?: UnpackPromise<ReturnType<typeof optionalAuth>>;
    }
  | undefined;
