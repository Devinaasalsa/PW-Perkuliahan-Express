const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

class AcaraBeritaController {
    async getAllAcaraBerita(req, res) {
        try {
            const acaraBeritas = await prisma.acaraBerita.findMany()
            res.status(200).json(acaraBeritas)
        } catch (error) {
            console.error("Terjadi kesalah saaat menampilkan data acata berita")
            res
                .status(500)
                .json({ error: "Terjaid kesalahan saat menampilkan data acara berita" })
        }
    }

    async getAcaraBeritaById(req, res) {
        const { id } = req.params
        try {
            const acaraBeritas = await prisma.acaraBerita.findFrist({
                where: {
                    id: parseInt(id)
                },
            })
            if (!acaraBerita) {
                return res.json(400).json({ error: "Acara berita tidak di temukan" })
            }
            res.json(acaraBeritas)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Terjadi kesalahan saat menampilkan data acara berita" })
        }
    }

    async createAcaraBerita(req, res) {
        const { date, jamMasuk, jamKeluar, descMateri } = req.body
        try {
            const exitingAcaraBerita = await prisma.acaraBerita.findFirst({
                where: {
                    date: new Date(date),
                },
            });
            console.log(exitingAcaraBerita);

            // if (exitingAcaraBerita) {
            //     return res.json({
            //         error: "Tanggal tersebut sudah di isi"
            //     })
            // }
            const newAcaraBerita = { date, jamMasuk, jamKeluar, descMateri }
            const acaraBeritas = await prisma.acaraBerita.create({
                data: {
                    ...newAcaraBerita,
                    date: new Date(date)
                },
            });
            res.json(acaraBeritas)
        } catch (error) {
            console.error("Terjadi kesalahan saat membuat acara berita", error)
            res
                .status(500)
                .json({ error: "Terjadi kesalah saat membuat acara berita" })
        }
    }
}

module.exports = AcaraBeritaController;
