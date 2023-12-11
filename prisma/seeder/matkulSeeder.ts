const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export async function MatkulSeed() {
  const matkul = await prisma.matkul.createMany({
    data: [
      {
        code: "SI1101",
        namaMatkul: "Aljabar Linear",
        jmlSks: 2,
        semester: 1
      },
      {
        code: "TB1101",
        namaMatkul: "Pendidikan Agama",
        jmlSks: 2,
        semester: 1
      },
      {
        code: "SI1105",
        namaMatkul: "Pengantar Bisnis dan Manajemen",
        jmlSks: 2,
        semester: 1
      },
      {
        code: "TB1102",
        namaMatkul: "Bahasa Inggris",
        jmlSks: 2,
        semester: 1
      },
      {
        code: "SI1104",
        namaMatkul: "Dasar-dasar Sistem Informasi",
        jmlSks: 4,
        semester: 1
      },
      {
        code: "SI1103",
        namaMatkul: "Matematika Diskrit",
        jmlSks: 4,
        semester: 1
      },
      {
        code: "SI1102",
        namaMatkul: "Kalkulus",
        jmlSks: 4,
        semester: 1
      },
      {
        code: "SI1201",
        namaMatkul: "Jaringan dan Komunikasi Data",
        jmlSks: 4,
        semester: 2
      },
      {
        code: "SI1202",
        namaMatkul: "Dasar-Dasar Pemrograman",
        jmlSks: 4,
        semester: 2
      },
      {
        code: "SI1203",
        namaMatkul: "Logika dan Algoritma",
        jmlSks: 4,
        semester: 2
      },
      {
        code: "SI1204",
        namaMatkul: "Arsitektur Organisasi Komputer",
        jmlSks: 4,
        semester: 2
      },
      {
        code: "FT1201",
        namaMatkul: "Pendidikan Pancasila",
        jmlSks: 4,
        semester: 2
      },
      {
        code: "FT1202",
        namaMatkul: "Bahasa Indonesia",
        jmlSks: 4,
        semester: 2
      },
    ]
  })


  console.log({ matkul })
}


// module.exports = RoleSeed