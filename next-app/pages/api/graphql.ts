import { ApolloServer } from "apollo-server-micro";
import { NextApiHandler } from "next";
import { schema } from "../../nexus";
import cors from "micro-cors";

export const config = {
  api: {
    bodyParser: false,
  },
};

let apolloServerHandler: NextApiHandler;

async function getApolloServerHandler() {
  const apolloServer = new ApolloServer({ schema });

  if (!apolloServerHandler) {
    await apolloServer.start();

    apolloServerHandler = apolloServer.createHandler({
      path: "/api/graphql",
    });
  }

  return apolloServerHandler;
}

const handler: NextApiHandler = async (req, res) => {
  const apolloServerHandler = await getApolloServerHandler();

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  return apolloServerHandler(req, res);
};
export default cors()(handler as any);
