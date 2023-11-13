
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

    async sumNilai(req, res) {
      try {
        const { nilaiTugas, uts, uas } = req.body;
        const { id } = req.params; // Mengambil id mahasiswa dari route
    
        // Mengambil totalHadir dari record terakhir di tabel Absensi
        const latestAbsensi = await prisma.absensi.findFirst({
          where: {
            mahasiswaId: parseInt(id),
          },
          orderBy: {
            createdAt: 'desc', // Mengurutkan berdasarkan yang terbaru
          },
        });
    
        // Memeriksa jika ada record terakhir
        if (!latestAbsensi) {
          return res.status(400).json({ error: "Data absensi tidak ditemukan" });
        }
    
        const totalHadir = latestAbsensi.totalHadir;
    
        // Menghitung nilai berdasarkan bobot
        const absenPercent = (totalHadir / 100) * 20;
        const tugasPercent = (nilaiTugas / 100) * 30;
        const utsPercent = (uts / 100) * 20;
        const uasPercent = (uas / 100) * 30;
    
        // Menghitung total nilai
        const angkaMutu = absenPercent + tugasPercent + utsPercent + uasPercent;
    
        let hurufMutu, ket;
    
        // Tentukan huruf mutu dan keterangan berdasarkan angka mutu
        if (angkaMutu >= 80) {
          hurufMutu = 'A';
          ket = 'Sangat Baik';
        } else if (angkaMutu >= 70) {
          hurufMutu = 'B';
          ket = 'Baik';
        } else if (angkaMutu >= 60) {
          hurufMutu = 'C';
          ket = 'Cukup';
        } else if (angkaMutu >= 50) {
          hurufMutu = 'D';
          ket = 'Kurang';
        } else {
          hurufMutu = 'E';
          ket = 'Sangat Kurang';
        }
    
        res.status(200).json({
          totalHadir,
          nilaiTugas,
          uts,
          uas,
          absenPercent,
          tugasPercent,
          utsPercent,
          uasPercent,
          angkaMutu,
          hurufMutu,
          ket,
        });
      } catch (error) {
        console.error("Terjadi kesalahan saat menghitung nilai", error);
        res.status(500).json({ error: "Terjadi kesalahan saat menghitung nilai" });
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