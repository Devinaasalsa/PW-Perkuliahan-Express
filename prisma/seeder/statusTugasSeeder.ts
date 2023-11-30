const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export async function StatusTugasSeeder() {
  const status = await prisma.statusTugas.createMany({
    data: [
      {
        statusTugas: "Ditugaskan"
      },
      {
        statusTugas: "Diserahkan"
      },
      {
        statusTugas: "Telat Diserahkan"
      }, {
        statusTugas: "Belum Diserahkan"
      },
    ]

  })


  console.log({ status })
}


// module.exports = RoleSeed