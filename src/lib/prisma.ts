// @ts-expect-error prisma client generation is handled at runtime
import { PrismaClient } from '@prisma/client'

// @ts-expect-error prisma client generation is handled at runtime
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
