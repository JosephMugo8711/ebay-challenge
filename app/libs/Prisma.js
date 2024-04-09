import { PrismaClient } from '@prisma/client'
// Creating a new instance of prisma client
const prisma = new PrismaClient()
//  Exporting the PrismaClient instance to be used in other parts of the application
export default prisma;