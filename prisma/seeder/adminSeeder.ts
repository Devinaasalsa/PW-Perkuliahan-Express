// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient()
// const bcrypt = require('bcrypt')


// export async function AdminSeed() {

//     const hashedPassword = await bcrypt.hash("12108381", 10); // You can adjust the salt rounds as needed
//     const admin = await prisma.admin.create({
//         data: {
//           adminName: "admin1",
//           password: hashedPassword,
//           matkulId: 1
//         }
//       })


//     const user = await prisma.user.create({
//         data: {
//                 username: "Devina Diva M. Kom",
//                 password: hashedPassword,
//                 roleId: 2,
//                 dosenId: dosen.id

//             }
//     })



//     console.log({ dosen, user })

// }