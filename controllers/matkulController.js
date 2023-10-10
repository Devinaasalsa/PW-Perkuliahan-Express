
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


class MatkulController {
    async getAllMatkul(req, res) {
    try {
        const matkuls = await prisma.matkul.findMany();
        res.status(200).json(matkuls);
    } catch (error) {
        console.error("Terjadi kesalahan saat menampilkan data Mata Kuliah", error);
        res
          .status(500)
          .json({ error: "Terjadi kesalahan saat menampilkan data Mata Kuliah" });
      }
}


    async createMatkul(req, res) {
    const { code, namaMatkul, jmlSks, semester, dosenId } = req.body;
    try {
      const existingCode = await prisma.matkul.findUnique({
        where: {
          code: code,
        },
      });

      if (existingCode) {
        return res.json({
          error: "Code telah terdaftar",
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
    async updateMatkul(req, res){
        const { code, namaMatkul, jmlSks, semester, dosenId } = req.body;
        const { id } = req.params;
        try {
            const matkuls = await prisma.matkul.update({
                where: {id:parseInt(id)},
                data: {code, namaMatkul, jmlSks, semester, dosenId}
            })
            res.status(200).json(matkuls);
        }catch(error) {
            console.log(error)
            res.status(500).json({ error: "Terjadi kesalahan saat update data mata kuliah" });
        }
    }

    async deleteMatkul (req, res) {
        const {id} = req.params;

        try {
            const matkuls = await prisma.matkul.delete({
                where: {id:parseInt(id)},
            })
            res.status(200).json(matkuls);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Terjadi kesalahan saat menghapus data mata kuliah" });
          }
    }

};
module.exports = MatkulController;