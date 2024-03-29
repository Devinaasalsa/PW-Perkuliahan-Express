const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

class AcaraBeritaController {
    async getAllAcaraBerita(req, res) {
        try {
            const acaraBeritas = await prisma.beritaAcara.findMany({
                include: {
                    dosen: true,
                }
            })

            const acaraBeritaData = acaraBeritas.map((beritaAcara) => ({
                id: beritaAcara.id,
                dosenName: acaraBeritaData,
                pertemuanKe: beritaAcara.pertemuanKe,
                date: beritaAcara.date,
                jamMasuk: beritaAcara.jamMasuk,
                jamKeluar: beritaAcara.jamKeluar,
                descMateri: beritaAcara.descMateri,
                jmlMhsHadir: beritaAcara.jmlMhsHadir
            }));
            res.status(200).json({
                statusCode: 200,
                acaraBeritas
            });
        } catch (error) {
            console.error("Terjadi kesalah saaat menampilkan data acata berita")
            res
                .status(500)
                .json({ error: "Terjadi kesalahan saat menampilkan data acara berita" })
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
            if (!acaraBeritas) {
                return res.json(400).json({ error: "Acara berita tidak di temukan" })
            }
            res.status(200).json({
                statusCode: 200,
                acaraBeritas
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Terjadi kesalahan saat menampilkan data acara berita" })
        }
    }

    async getAcaraDosen(req, res) {
        try {
            const loggedInDosenId = req.user.dosenId;
            const acaraBeritas = await prisma.beritaAcara.findMany({
                where: {
                    dosenId: loggedInDosenId
                }
            })
            res.status(200).json({
                statusCode: 200,
                acaraBeritas
            });
        } catch (error) {
            console.error("Terjadi kesalah saaat menampilkan data acata berita")
            res
                .status(500)
                .json({ error: "Terjaid kesalahan saat menampilkan data acara berita" })
        }
    }

    async createAcaraBerita(req, res) {
        try {
            const { date, jamMasuk, jamKeluar, descMateri, pertemuanKe, jmlMhsHadir } = req.body;
            const { dosenId } = req.query;
            const requiredFields = ['date', 'jamMasuk', 'jamKeluar', 'descMateri', 'pertemuanKe', 'jmlMhsHadir'];
            const missingFields = requiredFields.filter(field => !req.body[field]);
      
            if (missingFields.length > 0) {
              return res.status(400).json({
                success: false,
                message: `Field(s) ${missingFields.join(', ')} wajib diisi.`,
              });
            }
      
            // Menghitung jumlah mahasiswa yang hadir pada pertemuan tertentu
            // const countHadir = await prisma.absensi.count({
            //     where: {
            //         pertemuanKe: parseInt(pertemuanKe),
            //         statusId: 1, // ID untuk status "hadir"
            //     },
            // });

            // const jmlMhsHadir = countHadir;

          

            const beritaAcara = await prisma.beritaAcara.create({
                data: {
                    date,
                    jamMasuk,
                    jamKeluar,
                    descMateri,
                    dosenId: parseInt(dosenId),
                    pertemuanKe,
                    jmlMhsHadir,
    
                }
            });

            res.status(200).json({
                statusCode: 200,
                beritaAcara
            });
        } catch (error) {
            console.error('Terjadi kesalahan saat membuat berita acara', error);
            res.status(500).json({ error: 'Terjadi kesalahan saat membuat berita acara' });
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

            res.status(200).json({
                statusCode: 200,
                acaraBeritas
            });
        } catch (error) {
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
            res.json({ 
                statusCode: 200,
                message: "Data acara berita berhasil dihapus" });
        } catch (error) {
            console.error("Terjadi kesalahan saat menghapus data acaraBerita", error);
            res.status(500).json({ error: "Terjadi kesalahan saat menghapus data acaraBerita" });
        }
    }
}

module.exports = AcaraBeritaController;
