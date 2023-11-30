import { DosenSeed } from "./dosenSeeder"
import { MatkulSeed } from "./matkulSeeder"
import { MhsSeed } from "./mhsSeeder"
import { StatusAbsen } from "./statusAbsenSeeder"
import { StatusTugasSeeder } from "./statusTugasSeeder"

const { PrismaClient } = require('@prisma/client')
const { RoleSeed } = require('./roleSeeder')
const prisma = new PrismaClient()

async function main() {
  await RoleSeed()
  await MhsSeed()
  await MatkulSeed()
  await DosenSeed()
  await StatusTugasSeeder()
  await StatusAbsen()
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