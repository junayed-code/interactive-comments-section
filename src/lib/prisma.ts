import { PrismaClient } from "@prisma/client";

declare global {
  var _prisma: PrismaClient;
}

let prisma: PrismaClient;

if (global._prisma) {
  prisma = global._prisma;
} else {
  global._prisma = prisma = new PrismaClient();
}

export default prisma;
