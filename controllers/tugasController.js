const { PrismaClient } = require("@prisma/client");

const path = require("path");

const prisma = new PrismaClient();

class TugasController {
  async getAllTugas(req, res) {
    try {
      const now = new Date().toISOString();
      const tugass = await prisma.tugas.findMany();
  
      // Update statusTugasId for each task based on the current date
      const updatedTugass = await Promise.all(
        tugass.map(async (tugas) => {
          let statusTugas;
  
          if (new Date(tugas.dueDate) < new Date(now)) {
            statusTugas = 3; // Tugas lewat waktu
          } else {
            statusTugas = 1; // Tugas ditugaskan (belum lewat waktu)
          }
  
          // Update statusTugasId in the database
          await prisma.tugas.update({
            where: { id: tugas.id },
            data: { statusTugasId: statusTugas },
          });
  
          return {
            ...tugas,
            statusTugasId: statusTugas,
          };
        })
      );
  
      res.status(200).json(updatedTugass);
    } catch (error) {
      console.error("Terjadi kesalahan saat menampilkan data tugas");
      res.status(500).json({
        error: "Terjadi kesalahan saat menampilkan data tugas",
        data: error,
      });
    }
  }
  
  async searchTugas(req, res) {
    const { judul, topik } = req.query;

    try {
      let searchCondition = {};

      if (judul) {
        searchCondition = {
          ...searchCondition,
          judul: {
            contains: judul,
          },
        };
      }
      if (topik) {
        searchCondition = {
          ...searchCondition,
          topik: {
            contains: topik,
          },
        };
      }

      const tugas = await prisma.tugas.findMany({
        where: {
          OR: [searchCondition],
        },
      });

      res.status(200).json(tugas);
    } catch (error) {
      console.error("Terjadi kesalahan saat mencari Tugas", error);
      res.status(500).json({ error: "Terjadi kesalahan saat mencari Tugas" });
    }
  }

  async getTugasById(req, res) {
    const { id } = req.params;
    try {
      const tugass = await prisma.tugas.findFirst({
        where: {
          id: parseInt(id),
        },
      });
      if (!tugass) {
        return jes.json(400).json({ error: "Tugas tidak di temukan" });
      }
      res.json(tugass);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menampilkan data tugas " });
    }
  }

  async createTugas(req, res) {
    const { judul, deskripsi, image, dueDate, topik, dosenId, statusTugasId } =
      req.body;
    console.log(image);
    console.log(req.files);

    try {
      if (!req.files || !req.files[0]) {
        return res.status(400).json({
          success: false,
          message: "Tidak ada file Excel yang diunggah",
        });
      }

      const tugass = await prisma.tugas.create({
        data: {
          judul,
          dosen: {
            connect: {
              id: parseInt(dosenId),
            },
          },
          deskripsi,
          lampiran: req.files[0].filename,
          dueDate: new Date(dueDate).toISOString(),
          topik,
          statusTugas: {
            connect: {
              id: 1,
            },
              },
          },
      });
      res.json(tugass);
    } catch (error) {
      console.log(error);
      console.error("Terjadi kesalahan saat menambahkan tugas");
      res
        .status(500)
        .json({ error: "Terjadi kesalahaan saat menambahkan tugas" });
    }
  }

  async updateTugas(req, res) {
    const { judul, dosenId, deskripsi, image, dueDate, topik } = req.body;
    const { id } = req.params;
    try {
      const findTugas = await prisma.tugas.findFirst({
        where: {
          id: parseInt(id),
        },
      });

      if (!findTugas) {
        return res.status(400).json({ error: "Tugas tidak ditemukan" }); // Perbaiki res.status(400)
      }
      const tugass = await prisma.tugas.update({
        where: { id: parseInt(id) },
        data: {
          judul,
          dosenId,
          deskripsi,
          lampiran: req.files[0].filename,
          dueDate: new Date(dueDate).toISOString(),
          topik,
          },
          include: {
            dosen: true
        }
      });
      res.status(200).json(tugass);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Terjadi keselahan saat update data tugas" });
    }
  }

  async updateNilaiTugas(req, res) {
    const { point } = req.body;
    const { tugasId, mahasiswaId } = req.params;
    try {
      const tugass = await prisma.jawaban.update({
        where: {
          TugasID: parseInt(tugasId),
          MahasiswaID: parseInt(mahasiswaId),
        },
        data: {
          point: parseInt(point),
        },
      });
      res.status(200).json(tugass);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat memberi nilai pada tugas" });
    }
  }

  async kumpulkanTugas(req, res) {
      const { tugasId } = req.params;
      const { namaMahasiswa  } =
      req.body;
    // const userId = req.user.userId;

    const existingTugas = await prisma.tugas.findUnique({
      where: {
        id: parseInt(tugasId),
      },
    });

    if (!existingTugas) {
      return res.status(404).json({ error: "Tugas not found" });
    }

    try {
      const user = await prisma.user.findFirst({
        where: {
          username: namaMahasiswa,
        },
        include: {
          mahasiswa: true,
        },
      });
        
        console.log(user
        );

      if (!user) {
        return res
          .status(404)
          .json({ error: "Mahasiswa data not found for the logged-in user" });
      }

      const mahasiswaId = user.mhsId;
      // const userId = user.id;

      console.log("TugasID:", existingTugas.id);
      console.log("MahasiswaID:", mahasiswaId);
        
      const waktuPengumpulan = new Date().toISOString();
        const now = new Date().getTime();
        let statusTugas 
      let message
      console.log(existingTugas.dueDate.getTime())
      console.log(now)
        if (existingTugas.dueDate.getTime() > now) {
            statusTugas = 2 // <- isi dengan status tugas tepat waktu
            message = "Mahasiswa mengumpulkan tepat waktu"
        } else if (existingTugas.dueDate.getTime() < now) {
            statusTugas = 3 // <- isi dengan status tugas telat
            message = "Mahasiswa telat mengumpulkan tugas"
        }

      // Update tugasSiswa
      const jawaban = await prisma.jawaban.create({
        data: {
          lampiranJawaban: req.files[0].filename,
          WaktuPengumpulan: waktuPengumpulan,
          Tugas: {
            connect: {
              id: existingTugas.id,
            },
              },
          
          Mahasiswa: {
            connect: {
              id: mahasiswaId,
            },
              },
              statusTugas: {
                  connect: {
                  id: statusTugas
              }
          }
        },
      });

        res.status(200).json({
            data: jawaban,
            message
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengumpulkan tugas" });
    }
  }

  async getTugasKumpulkanById(req, res) {
    const { tugasId } = req.params;
  
    try {
      const tugas = await prisma.tugas.findUnique({
        where: {
          id: parseInt(tugasId),
        },
        include: {
          Jawaban: true, // Sertakan data jawaban mahasiswa jika diperlukan
        },
      });
  
      if (!tugas) {
        return res.status(404).json({ error: "Tugas not found" });
      }
  
      res.status(200).json(tugas);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Terjadi kesalahan saat mengambil data tugas" });
    }
  }

  async getAllKumpulkanTugas(req, res) {
    try {
      const allTugas = await prisma.tugas.findMany({
        // Tambahan: Jika Anda ingin menyertakan data jawaban mahasiswa
        include: {
          Jawaban: true,
        },
      });
  
      res.status(200).json(allTugas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Terjadi kesalahan saat mengambil data semua tugas" });
    }
  }
}




// Check if dueDate has passed and tugasSiswa is still null, then update statusTugasId to 3
// const currentDate = new Date();
// const dueDate = new Date(existingTugas.dueDate);
// console.log("Due Date:", dueDate);
// console.log("Current Date:", currentDate);

// if (dueDate < currentDate && updatedTugas.tugasSiswa === null) {
//     console.log("Updating Status to 3");
//     const overdueStatus = await prisma.tugas.update({
//         where: { id: parseInt(id) },
//         data: {
//             statusTugasId: 3,
//         },
//     });
// } else if (updatedTugas.tugasSiswa !== null) {
//     console.log("Updating Status to 2");
//     const updatedStatus = await prisma.tugas.update({
//         where: { id: parseInt(id) },
//         data: {
//             statusTugasId: 2,
//         },
//     });
// } else {
//     console.log("Updating Status to 1");
//     const nullStatus = await prisma.tugas.update({
//         where: { id: parseInt(id) },
//         data: {
//             statusTugasId: 1,
//         },
//     });
// }
module.exports = TugasController;
