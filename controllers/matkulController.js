
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


class MatkulController {
  async getAllMatkul(req, res) {
    try {
      const matkuls = await prisma.matkul.findMany({
        include: {
          dosen: {
            select: {
              id: true,
              dosenName: true
            }
          },
        }
      });
      res.status(200).json(matkuls);
    } catch (error) {
      console.error("Terjadi kesalahan saat menampilkan data Mata Kuliah", error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menampilkan data Mata Kuliah" });
    }
  }

  async getMatkulById(req, res) {
    const { id } = req.params;
    try {
      const matkuls = await prisma.matkul.findFirst({
        where: {
          id: parseInt(id),
        },
      });
      if (!matkuls) {
        return res.json(400).json({ error: "Mata kuliah tidak ditemukan" });
      }
      res.json(matkuls);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Terjadi kesalahan saat menampilkan data Mata kuliah" })
    }
  }

  async getMatkulByDosen(req, res) {
    const { dosenId } = req.query;
    
    try {
      const matkuls = await prisma.matkul.findMany({
        where: {
          dosen: {
            some: {
              id: parseInt(dosenId)
            }
          }
        },
        include: {
          dosen: {
            select: {
              id: true,
              dosenName: true
            }
          }
        }
      });
  
      res.status(200).json(matkuls);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Terjadi kesalahan saat menampilkan data matkul" });
    }
  }
  

  async searchMatkul(req, res) {
    const { code, namaMatkul } = req.query;

    try {
      let searchCondition = {};

      if (code) {
        searchCondition = {
          ...searchCondition,
          code: {
            contains: code,
            // mode: 'insensitive',
          },
        };
      }

      if (namaMatkul) {
        searchCondition = {
          ...searchCondition,
          namaMatkul: {
            contains: namaMatkul,
            // mode: 'insensitive',
          },
        };
      }

      const matkul = await prisma.matkul.findMany({
        where: {
          OR: [searchCondition],
        },
      });

      res.status(200).json(matkul);
    } catch (error) {
      console.error("Terjadi kesalahan saat mencari Mata Kuliah", error);
      res.status(500).json({ error: "Terjadi kesalahan saat mencari Mata Kuliah" });
    }
  }

  async createMatkul(req, res) {
    const { code, namaMatkul, jmlSks, semester, dosenId } = req.body;
    try {
      const requiredFields = ['code', 'namaMatkul', 'jmlSks', 'semester', 'dosenId'];
      const missingFields = requiredFields.filter(field => !req.body[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Field(s) ${missingFields.join(', ')} wajib diisi.`,
        });
      }

      const existingCode = await prisma.matkul.findUnique({
        where: {
          code: code,
        },
      });

      if (existingCode) {
        return res.status(500).json({
          error: "Gagal menambahkan mata kuliah, code telah terdaftar",
        });
      }

      const existingMatkul = await prisma.matkul.findUnique({
        where: {
          namaMatkul: namaMatkul,
        },
      });

      if (existingMatkul) {
        return res.status(500).json({
          error: "Gagal menambahkan mata kuliah, mata kuliah telah terdaftar",
        });
      }
      const newMatkul = { code, namaMatkul, jmlSks, semester, dosenId };
      const matkuls = await prisma.matkul.create({
        data: {
          ...newMatkul,
        },
      });
      res.json(matkuls);
    } catch (error) {
      console.error("Terjadi kesalahan saat menambahkan Mata Kuliah", error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menambahkan Mata Kuliah" });
    }
  }

  async updateMatkul(req, res) {
    const { code, namaMatkul, jmlSks, semester, dosenId } = req.body;
    const { id } = req.params;
    try {
      const matkuls = await prisma.matkul.update({
        where: { id: parseInt(id) },
        data: { code, namaMatkul, jmlSks, semester, dosenId }
      })
      res.status(200).json(matkuls);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Terjadi kesalahan saat update data mata kuliah" });
    }
  }

  async deleteMatkul(req, res) {
    const { id } = req.params;

    try {
      const matkuls = await prisma.matkul.delete({
        where: { id: parseInt(id) },
      })
      res.status(200).json(matkuls);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Terjadi kesalahan saat menghapus data mata kuliah" });
    }
  }

};
module.exports = MatkulController;