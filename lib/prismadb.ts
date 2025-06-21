/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from "@prisma/client"


// declare global {
//   var prisma: PrismaClient | undefined
// }

// const prismadb = globalThis.prisma || new PrismaClient()
// if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb

// export default prismadb;

// Temporary stub file to bypass Prisma
const prismadb = {
  userSubscription: {
    findUnique: async () => null,
  },
};

export default prismadb;

