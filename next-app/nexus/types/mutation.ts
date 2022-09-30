import { mutationType, nonNull, queryType, stringArg } from "nexus";
import { db } from "../../lib/prisma";

export const Mutation = mutationType({
  definition(t) {
    t.field("signupUser", {
      type: "User",
      args: {
        name: stringArg(),
        email: nonNull(stringArg()),
      },
      resolve: (_, { name, email }) => {
        return db().user.create({
          data: {
            name,
            email,
          },
        });
      },
    });
  },
});
