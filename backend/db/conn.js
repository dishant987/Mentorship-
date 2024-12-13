import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Middleware for hashing passwords
prisma.$use(async (params, next) => {
  // Check for `create` or `update` on the `User` model
  if (
    params.model === "User" &&
    (params.action === "create" || params.action === "update")
  ) {
    const userData = params.args.data;

    // Hash the password if it exists in the data
    if (userData?.password) {
      const saltRounds = 10; // Number of bcrypt salt rounds
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }
  }

  // Proceed with the database operation
  return next(params);
});

// Graceful shutdown for Prisma Client
process.on("SIGINT", async () => {
  console.log("Closing Prisma connection...");
  await prisma.$disconnect();
  process.exit(0);
});

export default prisma;
