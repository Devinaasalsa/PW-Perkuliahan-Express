import { DosenSeed } from "./dosenSeeder"
import { MatkulSeed } from "./matkulSeeder"
import { MhsSeed } from "./mhsSeeder"

const { PrismaClient } = require('@prisma/client')
const { RoleSeed } = require('./roleSeeder')
const prisma = new PrismaClient()

async function main() {
  // await RoleSeed()
  // await MhsSeed()
  // await MatkulSeed()
  await DosenSeed()
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })