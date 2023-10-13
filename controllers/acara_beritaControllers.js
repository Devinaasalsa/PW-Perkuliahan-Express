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

    async updateAcaraBerita(req, res) {
        const { date, jamMasuk, jamKeluar, descMateri } = req.body;
        const { id } = req.params;
    
        try {
            // Pastikan id sudah dikonversi ke integer jika diperlukan
            const acaraBeritas = await prisma.acaraBerita.update({
                where: { id: parseInt(id) },
                data: { date, jamMasuk, jamKeluar, descMateri }
            });
    
            // Respon dengan status 200 (OK) dan data yang diperbarui
            res.status(200).json(acaraBeritas);
        } catch (error) {
            // Tangani kesalahan dengan status 500 (Internal Server Error)
            console.log(error);
            res.status(500).json({ error: "Terjadi kesalahan saat update berita acara" });
        }
    }
    

    async deleteAcaraBerita(req, res) {
        const { id } = req.params;

        try {
            const acaraBeritas = await prisma.acaraBerita.delete({
                where: {
                    id: parseInt(id) // Anda perlu mengonversi id ke tipe data yang sesuai (misalnya, integer) jika id tersebut bukan string.
                }
            });
        
            // Lanjutkan dengan respons atau tindakan lain setelah penghapusan berhasil
            res.json({ message: "Data acaraBerita berhasil dihapus" });
        } catch (error) {
            console.error("Terjadi kesalahan saat menghapus data acaraBerita", error);
            res.status(500).json({ error: "Terjadi kesalahan saat menghapus data acaraBerita" });
        }
    }        
}

module.exports = AcaraBeritaController;
