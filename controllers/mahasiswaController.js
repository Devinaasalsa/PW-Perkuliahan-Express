
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


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

    async createMahasiswa(req, res) {
    const { mhsName, nim } = req.body;
    try {
      const existingNim = await prisma.mahasiswa.findUnique({
        where: {
          nim: nim,
        },
      });

      if (existingNim) {
        return res.json({
          error: "Nim telah terdaftar",
        });
      }
      const newMahasiswa = { mhsName, nim };
      const mahasiswas = await prisma.mahasiswa.create({
        data: {
          ...newMahasiswa,
        },
      });
      res.json(mahasiswas);
    } catch (error) {
      console.error("Terjadi kesalahan saat mendaftarkan Mahasiswa", error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mendaftarkan Mahasiswa" });
    }
}
    async updateMahasiswa(req, res){
        
    }

};
module.exports = MahasiswaController;