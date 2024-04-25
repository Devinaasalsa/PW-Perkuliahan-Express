
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
    const { id } = req.params;
    try {
      const mahasiswas = await prisma.mahasiswa.findFirst({
        where: {
          id: parseInt(id),
        },
        include: {
          assignedTugas: true,
      },
      });
      if (!mahasiswas) {
        return res.json(400).json({ error: "Mahasiswa tidak ditemukan" });
      }
      res.json(mahasiswas);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Terjadi kesalahan saat menampilkan data mahasiswa" })
    }
  }

  async searchMahasiswa(req, res) {
    const { mhsName, nim } = req.query;

    try {
      let searchCondition = {};

      if (mhsName) {
        searchCondition = {
          ...searchCondition,
          mhsName: {
            contains: mhsName,
            // mode: 'insensitive',
          },
        };
      }

      if (nim) {
        searchCondition = {
          ...searchCondition,
          nim: {
            contains: nim,
            // mode: 'insensitive',
          },
        };
      }

      const mahasiswas = await prisma.mahasiswa.findMany({
        where: {
          OR: [searchCondition],
        },
      });

      res.status(200).json(mahasiswas);
    } catch (error) {
      console.error("Terjadi kesalahan saat mencari mahasiswa", error);
      res.status(500).json({ error: "Terjadi kesalahan saat mencari mahasiswa" });
    }
  }


  async createMahasiswa(req, res) {
    const { mhsName, nim, tempatLahir, tanggalLahir, alamat } = req.body;
    try {
      const requiredFields = ['mhsName', 'nim', 'tempatLahir', 'tanggalLahir', 'alamat'];
      const missingFields = requiredFields.filter(field => !req.body[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Field(s) ${missingFields.join(', ')} wajib diisi.`,
        });
      }

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
      const newMahasiswa = { mhsName, nim, tempatLahir, tanggalLahir, alamat };
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
  async updateMahasiswa(req, res) {
    const { mhsName, nim, tempatLahir, tanggalLahir, alamat } = req.body;
    const { id } = req.params;
    try {
      const mahasiswas = await prisma.mahasiswa.update({
        where: { id: parseInt(id) },
        data: { mhsName, nim, tempatLahir, tanggalLahir, alamat }
      })
      res.status(200).json(mahasiswas);
    } catch (error) {
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
        res.status(200).json({
          statusCode: 200,
          message: "Sukses meghapus data Mahasiswa",
          mahasiswas});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Terjadi kesalahan saat menghapus data mahasiswa" });
      }
}
  
}

module.exports = MahasiswaController;