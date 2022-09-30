import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaClient | undefined = undefined;

export const db = () => {
  if (!prisma && process.env.NODE_ENV === "production") {
    prisma = new PrismaClient({ log: ["query", "info", "warn"] });
  } else if (!prisma) {
    if (!global.prisma) {
      global.prisma = new PrismaClient({ log: ["query", "info", "warn"] });
    }
    prisma = global.prisma;
  }

  return prisma as PrismaClient;
};
