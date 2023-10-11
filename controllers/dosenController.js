const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


class DosenController {
    async getAllDosen(req, res) {
    try {
        const dosens = await prisma.dosen.findMany({
            include: {
                matkul: true
            }
        });
        res.status(200).json(dosens);
    } catch (error) {
        console.error("Terjadi kesalahan saat menampilkan data dosen", error);
        res
          .status(500)
          .json({ error: "Terjadi kesalahan saat menampilkan data dosen" });
      }
}

    async getDosenById(req, res) {
        const {id} = req.params;
        try {
            const dosens = await prisma.dosen.findFirst({
                where: {
                    id: parseInt(id),
                },
                
            });
            if (!dosens) {
                return res.json(400).json({error: "Data dosen tidak ditemukan"});
            }
            res.json(dosens);
        }catch (error) {
            console.log(error);
            res.status(500).json({error: "Terjadi kesalahan saat menampilkan data dosen"})
        }
    }

    async createDosen(req, res) {
    const { dosenName, matkulId } = req.body;
    try {
      const existingName = await prisma.dosen.findUnique({
        where: {
          dosenName: dosenName,
        },
      });

      if (existingName) {
        return res.json({
          error: "Dosen telah terdaftar",
        });
      }
      const dosens = await prisma.dosen.create({
        data: {
          dosenName: dosenName,
          matkul: {
            connect: {
                id: matkulId
            }
          }
        },
        },
      );
      res.json(dosens);
    } catch (error) {
      console.error("Terjadi kesalahan saat menambahkan data Dosen", error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menambahkan data Dosen" });
    }
}
    async updateDosen(req, res){
        const { dosenName } = req.body;
        const { id } = req.params;
        try {
            const dosens = await prisma.dosen.update({
                where: {id:parseInt(id)},
                data: {dosenName}
            })
            res.status(200).json(dosens);
        }catch(error) {
            console.log(error)
            res.status(500).json({ error: "Terjadi kesalahan saat update data dosen" });
        }
    }

    async deleteDosen (req, res) {
        const {id} = req.params;

        try {
            const dosens = await prisma.dosen.delete({
                where: {id:parseInt(id)},
            })
            res.status(200).json(dosens);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Terjadi kesalahan saat menghapus data dosen" });
          }
    }

};
module.exports = DosenController;