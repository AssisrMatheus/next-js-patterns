import { mutationType, nonNull, queryType, stringArg } from "nexus";
import { db } from "../../lib/prisma";

export const Mutation = mutationType({
  definition(t) {
    t.field("signupUser", {
      type: "User",
      args: {
        email: nonNull(stringArg()),
        name: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: (_, { name, email }) =>
        db().user.create({ data: { name, email } }),
    });
  },
});
