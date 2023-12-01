const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')


export async function MhsSeed() {

    const mahasiswa = await prisma.mahasiswa.createMany({
        data: [
          {
          mhsName: "Devina Diva",
          nim: "12108381",
          tanggalLahir: "15/05/2006",
          alamat: "Villa Mutiara Lido Bogor"
        },
        {
          mhsName: "Aghiesna Nayla",
          nim: "12108282",
          tanggalLahir: "15/08/2006",
          alamat: "Villa Mutiara Lido Bogor"
        },
        {
          mhsName: "Nazwa Aulia",
          nim: "12108660",
          tanggalLahir: "05/05/2006",
          alamat: "Villa Mutiara Lido Bogor"

        }
      ],
      })

      const hashedPwDep = await bcrypt.hash("12108381", 10); 
      const hashedPwAghies = await bcrypt.hash("12108282", 10); 
      const hashedPwNaz = await bcrypt.hash("12108660", 10); 
 
    const user = await prisma.user.createMany({


        data: [
          {
                username: "Devina Diva",
                password: hashedPwDep,
                roleId: 3,
                mhsId: 1

            },
            {
              username: "Aghiesna Nayla",
              password: hashedPwAghies,
              roleId: 3,
              mhsId: 2

          },
          {
            username: "Nazwa Aulia",
            password: hashedPwNaz,
            roleId: 3,
            mhsId: 3

        }
          ]
    })



    console.log({ mahasiswa, user })

}