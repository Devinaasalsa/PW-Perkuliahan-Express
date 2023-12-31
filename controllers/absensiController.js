const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AbsensiController {

  //input absensi harus berupa objek
  async inputAbsensi(req, res) {
    try {
      const { pertemuanKe, absensiData } = req.body;
  
      // Gunakan Promise.all untuk membuat banyak permintaan secara bersamaan
      const absenPromises = absensiData.map(async (data) => {
        const { mahasiswaId, statusId } = data;
  
        const existingMahasiswa = await prisma.mahasiswa.findUnique({
          where: { id: mahasiswaId },
        });
  
        if (!existingMahasiswa) {
          return res.status(404).json({ error: `Mahasiswa dengan ID ${mahasiswaId} tidak ditemukan.` });
        }
  
        const existingStatusAbsen = await prisma.statusAbsen.findUnique({
          where: { id: statusId },
        });
  
        if (!existingStatusAbsen) {
          return res.status(404).json({ error: 'Status absen tidak ditemukan.' });
        }
  
        const countHadir = await prisma.absensi.count({
          where: {
            mahasiswaId: mahasiswaId,
            statusId: statusId,
            pertemuanKe: pertemuanKe,
          },
        });
  
        const totalHadir = countHadir;
  
        const absensi = await prisma.absensi.create({
          data: {
            pertemuanKe: pertemuanKe,
            mahasiswa: {
              connect: {
                id: mahasiswaId,
              },
            },
            statusId: statusId,
            totalHadir: totalHadir + 1,
          },
        });
  
        return absensi;
      });
  
      const createdAbsensi = await Promise.all(absenPromises);
  
      res.json(createdAbsensi);
    } catch (error) {
      console.error('Terjadi kesalahan saat mengabsen siswa', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengabsen siswa' });
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