const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AbsensiController {

  //input absensi harus berupa objek
  async inputAbsensi(req, res) {
    const pertemuanKe = req.params;
    const absensiData = req.body; // Menerima array objek absensi

    try {
      const absenPromises = absensiData.map(async (data) => {
        const { mahasiswaId, statusId } = data;

        const countHadir = await prisma.absensi.findMany({
          where: {
            mahasiswaId: mahasiswaId,
            statusId: 1, // ID untuk status "hadir"
          },
        });

        const totalHadir = countHadir.length;
        const hadir = totalHadir;

        const absen = await prisma.absensi.create({
          data: {
            pertemuanKe: parseInt(pertemuanKe),
            mahasiswa: {
              connect: {
                id: mahasiswaId,
              },
            },
            statusId: statusId,
            totalHadir: statusId === 1 ? hadir + 1 : hadir,
          },
        });

        return absen;
      });

      const createdAbsensi = await Promise.all(absenPromises);

      res.json(createdAbsensi);
    } catch (error) {
      console.error("Terjadi kesalahan saat menginput absensi", error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menginput absensi" });
    }
  }

  async getAbsensi(req, res) {
    try {
      const absens = await prisma.absensi.findMany();
      res.status(200).json(absens);
    } catch (error) {
      console.error("Terjadi kesalahan saat menampilkan data absensi", error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menampilkan data absensi" });
    }

  }

  async getLatestAbsenByMhsId(req, res) {
    const { id } = req.params;
  
    try {
      const mahasiswa = await prisma.mahasiswa.findFirst({
        where: {
          id: parseInt(id),
        },
        include: {
          absensi: {
            select: {
              totalHadir: true,
            },
            orderBy: {
              // Kolom waktu yang akan digunakan untuk pengurutan (misalnya, createdAt)
              createdAt: 'desc', // 'desc' untuk descending (paling baru dulu)
            },
            take: 1, // Ambil hanya satu rekaman (paling baru)
          },
        },
      });
  
      if (!mahasiswa) {
        return res.status(400).json({ error: "Mahasiswa tidak ditemukan" });
      }
  
      // Ambil rekaman absensi terbaru
      const latestAbsensi = mahasiswa.absensi[0];
  
      res.json(latestAbsensi);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Terjadi kesalahan saat menampilkan data absensi" });
    }
  }
  

}

module.exports = AbsensiController;