const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')


export async function DosenSeed() {

    const dosen = await prisma.dosen.create({
        data: {
          dosenName: "Devina Diva M. Kom",
          nip: "12108381",
          matkulId: 1
        }
      })

      const hashedPassword = await bcrypt.hash("12108381", 10); // You can adjust the salt rounds as needed

    const user = await prisma.user.create({
        data: {
                username: "Devina Diva",
                password: hashedPassword,
                roleId: 2,
                dosenId: dosen.id

            }
    })



    console.log({ dosen, user })

}