import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaClient | undefined = undefined;

const getPrismaClient = () =>
  new PrismaClient({ log: ["query", "info", "warn"] });

export const db = () => {
  if (!prisma && process.env.NODE_ENV === "production") {
    prisma = getPrismaClient();
  } else if (!prisma) {
    if (!global.prisma) {
      global.prisma = getPrismaClient();
    }
    prisma = global.prisma;
  }

  return prisma as PrismaClient;
};
