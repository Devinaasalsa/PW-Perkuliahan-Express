const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export async function MatkulSeed() {
  const matkul = await prisma.matkul.create({
    data:{
        code: "SK910920",
        namaMatkul:"Ilmu Pengetahuan",
        jmlSks: 2,
        semester: 1
      }
    
  })


  console.log({ matkul })
}


// module.exports = RoleSeed