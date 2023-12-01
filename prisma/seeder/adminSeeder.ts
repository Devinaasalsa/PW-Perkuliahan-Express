const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')


export async function AdminSeed() {

    const hashedPassword = await bcrypt.hash("admin1", 10); // You can adjust the salt rounds as needed
    const admin = await prisma.admin.create({
        data: {
          adminName: "admin1",
          password: hashedPassword,
        }
      })


    const user = await prisma.user.create({
        data: {
                username: "admin1",
                password: hashedPassword,
                roleId: 1,
                adminId: admin.id

            }
    })



    console.log({ admin, user })

}