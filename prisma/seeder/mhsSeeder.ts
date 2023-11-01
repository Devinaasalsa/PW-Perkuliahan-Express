const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')


export async function MhsSeed() {

    const mahasiswa = await prisma.mahasiswa.create({
        data: {
          mhsName: "Devina Diva",
          nim: "12108381",
        }
      })

      const hashedPassword = await bcrypt.hash("12108381", 10); // You can adjust the salt rounds as needed

    const user = await prisma.user.create({


        data: {
                username: "Devina Diva",
                password: hashedPassword,
                roleId: 3,
                mhsId: mahasiswa.id

            }
    })



    console.log({ mahasiswa, user })

}