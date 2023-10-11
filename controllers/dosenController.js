const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class DosenController {
    async getAllDosen(req, res) {
        try {
            const dosen = await prisma.dosen.findMany();
            res.status(200).json(dosen);
        } catch (error) {
            console.error("Terjadi kesalahan saat menampilkan data dosen", error);
            res
                .status(500)
                .json({ error: "Terjadi kesalahan saat menampilkan data dosen"})
        }
    }

    async getDosenById(req, res) {
        const { id } = req.params;
        try {
            const dosens = await prisma.dosen.findFirst({
                where: {
                    id: parseInt(id)
                },
            });
            if (!dosens) {
                return res.json(400).json(400).json({ error: "Dosen tidak ditemukan" });
            }
            res.json(dosens);
        } catch (error) {
            console.log(error);
            res.status(500).json({error: "Terjadi keslaah saat menampilkan data dosen"})
        }
    }

    async createDosen(req, res) {
        const { dosenName } = req.body;
        try {
            const exitingDsn = await prisma.dosen.findUnique({
                where: {
                    dosenName: dosenName,
                },
            });

            if (exitingDsn) {
                return res.json({
                    error: "Nama dosen telah terdaftar",
                });
            }
            const newDosen = { dosenName };
            const dosens = await prisma.dosen.create({
                data: {
                    ...newDosen,
                },
            });
            res.json(dosens);
        } catch (error) {
            console.error("Terjadi kesalahan saat mendaftarkan dosen", error);
            res
                .status(500)
                .json({ error: "Terjadi kesalahan saat mendaftarkan dosen" });
        }
    }
};
module.exports = DosenController;