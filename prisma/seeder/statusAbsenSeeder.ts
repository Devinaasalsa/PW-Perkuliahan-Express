const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export async function StatusAbsen() {
  const statusAbsen = await prisma.statusAbsen.createMany({
    data:[
        {
            statusAbsen: "Hadir"
        },
        {
            statusAbsen: "Sakit"
        },{
            statusAbsen: "Izin"
        },
        {
            statusAbsen: "Alfa"
        },
    ]
    
  })


  console.log({ statusAbsen })
}


// module.exports = StatusAbsen