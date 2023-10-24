
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


class NilaiController {
    async getNilai(req, res) {
    try {
        const nilaiAkhir = await prisma.nilai.findMany();
        res.status(200).json(nilaiAkhir);
    } catch (error) {
        console.error("Terjadi kesalahan saat menampilkan data Nilai", error);
        res
          .status(500)
          .json({ error: "Terjadi kesalahan saat menampilkan data Nilai" });
      }
    }

    async sumNilai(req, res){
        
    }

    async inputNilai(req, res) {
  const { totalAbsen, nilaiTugas, uts, uas, absenPercent, tugasPercent, utsPercent, uasPercent, angkaMutu, hurufMutu,ket } = req.body;
  try {
    const newNilai = {totalAbsen, nilaiTugas, uts, uas, absenPercent, tugasPercent, utsPercent, uasPercent, angkaMutu, hurufMutu,ket};
    const nilaiAkhir = await prisma.nilaiAkhir.create({
      data: {
        ...newNilai,
      },
    });
    res.json(nilaiAkhir);
  } catch (error) {
    console.error("Terjadi kesalahan saat menginput Nilai", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat menginput Nilai" });
  }
    }

    async getMahasiswaById(req, res) {
        const {id} = req.params;
        try {
            const mahasiswas = await prisma.mahasiswa.findFirst({
                where: {
                    id: parseInt(id),
                },
            });
            if (!mahasiswas) {
                return res.json(400).json({error: "Mahasiswa tidak ditemukan"});
            }
            res.json(mahasiswas);
        }catch (error) {
            console.log(error);
            res.status(500).json({error: "Terjadi kesalahan saat menampilkan data mahasiswa"})
        }
    }

    async updateMahasiswa(req, res){
        const { mhsName, nim } = req.body;
        const { id } = req.params;
        try {
            const mahasiswas = await prisma.mahasiswa.update({
                where: {id:parseInt(id)},
                data: {mhsName, nim}
            })
            res.status(200).json(mahasiswas);
        }catch(error) {
            console.log(error)
            res.status(500).json({ error: "Terjadi kesalahan saat update data mahasiswa" });
        }
    }

    async deleteMahasiswa (req, res) {
        const {id} = req.params;

        try {
            const mahasiswas = await prisma.mahasiswa.delete({
                where: {id:parseInt(id)},
            })
            res.status(200).json(mahasiswas);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Terjadi kesalahan saat menghapus data mahasiswa" });
          }
    }

};
module.exports = NilaiController;