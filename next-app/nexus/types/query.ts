import { queryType } from "nexus";

export const Query = queryType({
  definition(t) {
    t.field("user", {
      type: "User",
      resolve: (_, args) => {
        return {
          id: 1,
          name: "Matheus",
        };
      },
    });
  },
});
