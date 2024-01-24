const { PrismaClient } = require("@prisma/client");

const path = require("path");

const prisma = new PrismaClient();
const { jwtDecode } = require('jwt-decode');

class TugasController {
  async getAllTugas(req, res) {
    try {
      const now = new Date().toISOString();
      const tugass = await prisma.tugas.findMany({
        include: {
          matkul: {
            select: {
            id: true,
            namaMatkul: true
          }
        },
        dosen: {
          select: {
            id: true,
            dosenName: true
          }
        },
      }
      });

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

      res.status(200).json({
        statusCode: 200,
        updatedTugass
      });
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

      res.status(200).json({
        statusCode: 200,
        tugas
      });
    } catch (error) {
      console.error("Terjadi kesalahan saat mencari Tugas", error);
      res.status(500).json({ error: "Terjadi kesalahan saat mencari Tugas" });
    }
  }

  //buat get topik tugas sesuai mata kuliah
  async getTugasByMatkul(req, res) {
    const { matkulId } = req.params;
    try {
      const tugass = await prisma.tugas.findMany({
        where: {
          matkulId: parseInt(matkulId),
        },
        
          include: {
            matkul: {
              select: {
              id: true,
              namaMatkul: true
            }
          },
          dosen: {
            select: {
              id: true,
              dosenName: true
            }
          },
        
        }
      });
      res.status(200).json(tugass);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menampilkan data tugas " });
    }
  }

  //get tugas sesuai topik yang dipilih
  async getTugasByTopik(req, res) {
    const { topik } = req.query;
    try {
      const tugass = await prisma.tugas.findMany({
        where: {
          topik: topik
        },
        
          include: {
            matkul: {
              select: {
              id: true,
              namaMatkul: true
            }
          },
          dosen: {
            select: {
              id: true,
              dosenName: true
            }
          },
        
        }
      });
      res.status(200).json(tugass);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menampilkan data tugas " });
    }
  }

  //buat get detail tugas (desc, lampiran, dll)
  async getTugasById(req, res) {
    const { id } = req.params;
    try {
      const tugass = await prisma.tugas.findFirst({
        where: {
          id: parseInt(id),
        },
        
          include: {
            matkul: {
              select: {
              id: true,
              namaMatkul: true
            }
          },
          dosen: {
            select: {
              id: true,
              dosenName: true
            }
          },
        
        }
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
    const { judul, deskripsi, image, dueDate, topik, dosenId, link, statusTugasId } = req.body;
    const matkulId = parseInt(req.params.matkulId);
    console.log(image);
    console.log(req.files);

    try {
      const requiredFields = ['judul', 'deskripsi', 'dueDate', 'topik', 'dosenId'];
      const missingFields = requiredFields.filter(field => !req.body[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Field(s) ${missingFields.join(', ')} wajib diisi.`,
        });
      }

      const tugass = await prisma.tugas.create({
        data: {
          dosen: {
            connect: {
              id: parseInt(dosenId),
            },
          },
          matkul: {
            connect: {
                id: matkulId,
            },
        },
          deskripsi,
          judul,
          lampiran: req.files[0] ? req.files[0].filename : null,
          link: link || null,
          dueDate,
          topik,
          statusTugas: {
            connect: {
              id: 1,
            },
          },
          assignedMahasiswa: {
            connect: {
              // This assumes that you have a method to retrieve all Mahasiswa IDs
              id: {
                in: await prisma.mahasiswa.findMany({
                  select: { id: true },
                }),
              },
            },
          }
        },
        include: {
          dosen: true,
          assignedMahasiswa: true,
        }
      });

      res.status(200).json({
        statusCode: 200,
        tugass});
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
    const { namaMahasiswa, linkUrl  } =
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


      decoded = jwtDecode(token);
      const mhsId = decoded.mhsId;

    // Update tugasSiswa
    const jawaban = await prisma.jawaban.create({
      data: {
        lampiranJawaban: req.files[0].filename,
        WaktuPengumpulan: waktuPengumpulan,
        linkUrl: linkUrl,
        Tugas: {
          connect: {
            id: existingTugas.id,
          },
            },
        
        Mahasiswa: {
          connect: {
            id: mhsId,
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

      // Mendapatkan data pengumpulan tugas terkait (jika ada)
      const kumpulanTugas = await prisma.jawaban.findFirst({
        where: {
          TugasID: tugas.id,
        },
      });

      console.log(kumpulanTugas)

      let message = "Mahasiswa belum mengumpulkan tugas";
      if (kumpulanTugas) {
        if (kumpulanTugas.statusTugasId === 2) {
          message = "Mahasiswa mengumpulkan tepat waktu";
        } else if (kumpulanTugas.statusTugasId === 3) {
          message = "Mahasiswa telat mengumpulkan tugas";
        }
      }

      // Menambahkan pesan ke objek tugas
      tugas.message = message;

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

      // Loop melalui semua tugas dan tambahkan properti "message" pada setiap tugas
      const tugasWithMessages = allTugas.map((tugas) => {
        let message = "Mahasiswa belum mengumpulkan tugas";
        if (tugas.Jawaban && tugas.Jawaban.length > 0) {
          const kumpulanTugas = tugas.Jawaban[0]; // Menggunakan jawaban pertama sebagai contoh
          if (kumpulanTugas.statusTugasId === 2) {
            message = "Mahasiswa mengumpulkan tepat waktu";
          } else if (kumpulanTugas.statusTugasId === 3) {
            message = "Mahasiswa telat mengumpulkan tugas";
          }
        }

        // Tambahkan properti "message" pada objek tugas
        return {
          ...tugas,
          message: message,
        };
      });

      res.status(200).json(tugasWithMessages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Terjadi kesalahan saat mengambil data semua tugas" });
    }
  }
}


module.exports = TugasController;
