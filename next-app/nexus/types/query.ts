import { intArg, nonNull, queryType } from "nexus";
import { db } from "../../lib/prisma";

export const Query = queryType({
  definition(t) {
    t.field("user", {
      type: "User",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, { id }) => db().user.findUnique({ where: { id } }),
    });
  },
});
