import { intArg, list, nonNull, queryType } from "nexus";
import { db } from "../../lib/prisma";
import { User } from "./user";

export const Query = queryType({
  definition(t) {
    t.field("user", {
      type: User,
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, { id }) => db().user.findUnique({ where: { id } }),
    });
    t.field("users", {
      type: nonNull(list(nonNull(User))),
      resolve: () => db().user.findMany(),
    });
  },
});
