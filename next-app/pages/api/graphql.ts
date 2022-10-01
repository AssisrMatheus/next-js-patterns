import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../nexus";
import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";
import runMiddleware from "../../lib/nextjs/runMiddleware";
import { optionalAuth } from "../../lib/next-auth/auth";

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  const apolloServer = new ApolloServer({
    schema,
    context: async (ctx) => {
      const session = await optionalAuth(ctx);

      return { session };
    },
  });

  await apolloServer.start();

  return apolloServer.createHandler({ path: "/api/graphql" })(req, res);
}
