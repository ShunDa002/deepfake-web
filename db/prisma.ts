// Import Prisma Client
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client for Supabase PostgreSQL
// The DATABASE_URL or POSTGRES_PRISMA_URL from .env is automatically used
const prisma = new PrismaClient();

export { prisma };
