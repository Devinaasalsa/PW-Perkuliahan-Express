const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export async function RoleSeed() {
  const role = await prisma.role.createMany({
    data:[
        {
            roleName: "Admin"
        },
        {
            roleName: "Dosen"
        },{
            roleName: "Mahasiswa"
        },
    ]
    
  })


  console.log({ role })
}


// module.exports = RoleSeed