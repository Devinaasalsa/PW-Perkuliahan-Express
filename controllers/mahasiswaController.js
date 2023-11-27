
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require('bcrypt')


class MahasiswaController {
    async getAllMahasiswa(req, res) {
    try {
        const mahasiswas = await prisma.mahasiswa.findMany();
        res.status(200).json(mahasiswas);
    } catch (error) {
        console.error("Terjadi kesalahan saat menampilkan data Mahasiswa", error);
        res
          .status(500)
          .json({ error: "Terjadi kesalahan saat menampilkan data Mahasiswa" });
      }
}

    async getMahasiswaById(req, res) {
        const {id} = req.params;
        try {
            const mahasiswas = await prisma.mahasiswa.findFirst({
                where: {
                    id: parseInt(id),
                },
            });
            if (!mahasiswas) {
                return res.json(400).json({error: "Mahasiswa tidak ditemukan"});
            }
            res.json(mahasiswas);
        }catch (error) {
            console.log(error);
            res.status(500).json({error: "Terjadi kesalahan saat menampilkan data mahasiswa"})
        }
    }

    async createMahasiswa(req, res) {
    const { mhsName, nim } = req.body;
    try {
      const existingNim = await prisma.mahasiswa.findUnique({
        where: {
          nim: nim,
        },
      });

      if (existingNim) {
        return res.status(500).json({
          error: "Gagal mendaftarkan mahasiswa, NIM telah terdaftar",
        });
      }
      const newMahasiswa = { mhsName, nim };
      const mahasiswas = await prisma.mahasiswa.create({
        data: {
          ...newMahasiswa,
        },
      });

      const hashedPassword = await bcrypt.hash(nim, 10); // You can adjust the salt rounds as needed

      const mahasiswaId = mahasiswas.id

      const users = await prisma.user.create({
        data: {
          username: mhsName,
          password: hashedPassword,
          roleId: 3,
          mhsId: mahasiswaId
        }
      })
      res.json(mahasiswas);
    } catch (error) {
      console.error("Terjadi kesalahan saat mendaftarkan Mahasiswa", error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mendaftarkan Mahasiswa" });
    }
}
    async updateMahasiswa(req, res){
        const { mhsName, nim } = req.body;
        const { id } = req.params;
        try {
            const mahasiswas = await prisma.mahasiswa.update({
                where: {id:parseInt(id)},
                data: {mhsName, nim}
            })
            res.status(200).json(mahasiswas);
        }catch(error) {
            console.log(error)
            res.status(500).json({ error: "Terjadi kesalahan saat update data mahasiswa" });
        }
    }

    async deleteMahasiswa (req, res) {
        const {id} = req.params;

        try {
            const mahasiswas = await prisma.mahasiswa.delete({
                where: {id:parseInt(id)},
            })

            const mahasiswaId = mahasiswas.id
            const users = await prisma.user.delete({
              where: {
                id: parseInt(mahasiswaId)
              }
            })
            res.status(200).json(mahasiswas);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Terjadi kesalahan saat menghapus data mahasiswa" });
          }
    }


  
};
module.exports = MahasiswaController;