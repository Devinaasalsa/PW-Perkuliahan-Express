const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

class AbsensiController{
  async inputAbsensi(req, res) {
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
      console.error("Terjadi kesalahan saat mendaftarkan Mahasiswa", error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mendaftarkan Mahasiswa" });
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
}

module.exports = AbsensiController;