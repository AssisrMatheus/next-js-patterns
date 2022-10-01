import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { UnauthorizedError } from "./unauthorizedError";

// * Full server side calls(getServerSideProps/backend) will always have session (if user is logged in). No layout shift but pages aren't cached which is slow and not reliable
// * If a Page is fully static (no getServerSideProps, no getStaticProps). The request will be done only on client side anyway where the user has cookies, and will always have session (if user is logged in). The disadvantage is the layout shift.
// * If either:
// *   - Page is statically cached (getStaticProps with or without revalidate).
// *   - Page is incrementally generated (getStaticProps WITH revalidate).
// *   The server doesn't have req,res when the cache is generated, so it won't have session on the first cache request. You can either accept that because it's enough for your use case(loading something that does not need user). Or use `fetchPolicy: "cache-and-network"`, which starts with cached data for no layout shift(which is good!!), but then refetches again, where this second refech WILL HAVE session(if user is logged in). Or add a loading state and transition and load it fully on client side without caching (fetchPolicy: "network-only"`)

// ! Please favor using MIDDLEWARE (https://next-auth.js.org/configuration/nextjs#middleware) or client side checking(depending on the case) BEFORE using this
// ! to check if the user is available for something like a redirect or conditionally displaying something on the UI.
// ! This here should ONLY be used by the backend side of the app

type SessionParameters = Parameters<typeof unstable_getServerSession>;

export const optionalAuth = (ctx?: {
  req?: SessionParameters[0];
  res?: SessionParameters[1];
}) =>
  // If there's context and this context has either req or res
  ctx &&
  ctx.req &&
  ctx.res &&
  // REF: https://next-auth.js.org/configuration/nextjs#unstable_getserversession
  // The unstable_getServerSession only has the prefix unstable_ at the moment because the API may change in the future. There should be no known bugs at the moment and it is safe to use
  unstable_getServerSession(ctx?.req, ctx?.res, authOptions);

export const requiredAuth = async (ctx?: {
  req?: SessionParameters[0];
  res?: SessionParameters[1];
}) => {
  const session = await optionalAuth(ctx);

  if (!session) {
    throw new UnauthorizedError();
  }

  return session;
};

export const hasSession = async (ctx?: {
  req?: SessionParameters[0];
  res?: SessionParameters[1];
}) => !!(await optionalAuth(ctx));
