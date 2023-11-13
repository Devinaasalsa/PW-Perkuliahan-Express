const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')


export async function MhsSeed() {

    const mahasiswa = await prisma.mahasiswa.create({
        data: [
          {
          mhsName: "Devina Diva",
          nim: "12108381",
        },
        {
          mhsName: "Aghiesna Nayla",
          nim: "12108282",
        },
        {
          mhsName: "Nazwa Aulia",
          nim: "12108660",
        }
      
      ]
      })

      const hashedPwDep = await bcrypt.hash("12108381", 10); // You can adjust the salt rounds as needed
      const hashedPwAghies = await bcrypt.hash("12108282", 10); // You can adjust the salt rounds as needed
      const hashedPwNaz = await bcrypt.hash("12108660", 10); // You can adjust the salt rounds as needed
 
    const user = await prisma.user.create({


        data: [
          {
                username: "Devina Diva",
                password: hashedPwDep,
                roleId: 3,
                mhsId: mahasiswa.id

            },
            {
              username: "Devina Diva",
              password: hashedPwAghies,
              roleId: 3,
              mhsId: mahasiswa.id

          },
          {
            username: "Devina Diva",
            password: hashedPwNaz,
            roleId: 3,
            mhsId: mahasiswa.id

        }
          ]
    })



    console.log({ mahasiswa, user })

}