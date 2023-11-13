const { PrismaClient } = require('@prisma/client');

const path = require('path');

const prisma = new PrismaClient();

class TugasController {
    async getAllTugas(req, res) {
        try {
            const tugass = await prisma.tugas.findMany()
            res.status(200).json(tugass)
        } catch (error) {
            console.error("Terjadi kesalahan saat menampilkan data tugas")
            res
                .status(500)
                .json({ error: "Terjadi kesalahan saat menampilkan data tugas", data: error })
        }
    }

    async getTugasById(req, res) {
        const { id } = req.params
        try {
            const tugass = await prisma.tugas.findFirst({
                where: {
                    id: parseInt(id)
                },
            });
            if (!tugass) {
                return jes.json(400).json({error: "Tugas tidak di temukan"})
            }
            res.json(tugass)
        } catch (error) {
            console.log(error)
            res.status(500).json({error: "Terjadi kesalahan saat menampilkan data tugas "})
        }
    }

    //for dosen
    async createTugas(req, res) {
        const { judul, deskripsi, image, dueDate, topik, dosenId, statusTugasId } = req.body      
        console.log(image)
        console.log(req.files)

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
                            id: parseInt(dosenId)
                        }
                    },
                    deskripsi,
                    lampiran: req.files[0].filename,
                    point: 0,
                    dueDate: new Date(dueDate).toISOString(),
                    topik,
                    statusTugas: {
                        connect: {
                            id: 1
                        }
                    }
                  },
            })
            res.json(tugass)
        } catch (error) {
            console.log(error)
            console.error("Terjadi kesalahan saat menambahkan tugas")
            res
                .status(500)
                .json({ error: "Terjadi kesalahaan saat menambahkan tugas" })
        }
    }

    async updateTugas(req, res) {
        const { judul, dosenId, deskripsi, image, point, dueDate, topik } = req.body
        const { id } = req.params
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
                data: {judul,
                    dosenId,
                    deskripsi,
                    lampiran: req.files[0].filename,
                    point: 0,
                    dueDate: new Date(dueDate).toISOString(),
                    topik}
            })
            res.status(200).json(tugass)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Terjadi keselahan saat update data tugas" })
        }
    }

    async updateNilaiTugas(req, res) {
        const { point } = req.body
        const { id } = req.params
        try {
            const tugass = await prisma.tugas.update({
                where: { id: parseInt(id) },
                data: {
                    point: parseInt(point),
                    statusTugasId: 2
                }
            })
            res.status(200).json(tugass)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Terjadi keselahan saat update data tugas" })
        }
    }
    

    //for mahasiswa
    async kumpulkanTugas(req, res) {
        const {image } = req.body;
        const { id } = req.params

    
        try {
            const existingTugas = await prisma.tugas.findFirst({
                where: {
                    id: parseInt(id),
                },
            });
    
            if (!existingTugas) {
                return res.status(400).json({ error: "Tugas tidak ditemukan" }); // Perbaiki res.status(400)
              }
    
            const tugass = await prisma.tugas.update({
                where: { id: parseInt(id) },
                data: {
                    tugasSiswa: req.files[0].filename,
                }
            })
            res.status(200).json(tugass)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Terjadi keselahan saat mengumpulkan tugas" })
        }
    }

    
    
    
}

module.exports = TugasController;