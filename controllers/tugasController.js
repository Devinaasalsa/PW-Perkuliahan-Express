const { PrismaClient } = require("@prisma/client");

const path = require("path");

const prisma = new PrismaClient();

class TugasController {
  async getAllTugas(req, res) {
    try {
      const tugass = await prisma.tugas.findMany();
      res.status(200).json(tugass);
    } catch (error) {
      console.error("Terjadi kesalahan saat menampilkan data tugas");
      res
        .status(500)
        .json({
          error: "Terjadi kesalahan saat menampilkan data tugas",
          data: error,
        });
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

  //for dosen
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
      const tugass = await prisma.jawaban.updateMany({
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

  //for mahasiswa
  async kumpulkanTugas(req, res) {
    const { tugasId } = req.params;
    const userId = req.user.userId;

    const existingTugas = await prisma.tugas.findUnique({
      where: {
        id: parseInt(tugasId),
      },
    });

    if (!existingTugas) {
      return res.status(404).json({ error: "Tugas not found" });
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          mahasiswa: true,
        },
      });

      if (!user || !user.mahasiswa) {
        return res
          .status(404)
          .json({ error: "Mahasiswa data not found for the logged-in user" });
      }

      const mahasiswaId = user.mahasiswa.id;
      // const userId = user.id;

      console.log("TugasID:", existingTugas.id);
      console.log("MahasiswaID:", mahasiswaId);
      console.log("UserID:", userId);

      // Update tugasSiswa
      const jawaban = await prisma.jawaban.create({
        data: {
          lampiranJawaban: req.files[0].filename,
          WaktuPengumpulan: new Date(),
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
        },
      });

      res.status(200).json(jawaban);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengumpulkan tugas" });
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
