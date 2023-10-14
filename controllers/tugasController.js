const { PrismaClient } = require("@prisma/client")

const path = require('path');

const prisma = new PrismaClient

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

    async createTugas(req, res) {
        const { judul, namaDosen, deskripsi, image, point, dueDate, topik } = req.body      
        console.log(image)
        console.log(req.files)
        try {
            if (!req.files || !req.files[0]) {
                return res.status(400).json({
                    success: false,
                    message: "Tidak ada file Excel yang diunggah",
                });
            }
            // const exitingTugas = await prisma.tugas.findFirst({
            //     where: {
            //         judul: judul,
            //     },
            // })

            // if (exitingTugas) {
            //     return res.json({
            //         error : "Tugas telah terdaftar",
            //     })
            // }

            const newTugas = {
                judul,
                namaDosen,
                deskripsi,
                lampiran: req.files[0].filename,
                point: parseInt(point),
                dueDate: new Date(dueDate).toISOString(),
                topik
              };
            const tugass = await prisma.tugas.create({
                data: {
                    ...newTugas,
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
        const { judul, namaDosen, deskripsi, image, point, dueDate, topik } = req.body
        const { id } = req.params
        try {
            const tugass = await prisma.tugas.update({
                where: { id: parseInt(id) },
                data: {judul,
                    namaDosen,
                    deskripsi,
                    lampiran: req.files[0].filename,
                    point: parseInt(point),
                    dueDate: new Date(dueDate).toISOString(),
                    topik}
            })
            res.status(200).json(tugass)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Terjadi keselahan saat update data tugas" })
        }
    }
    
    // async updateTugas(req, res) {
    //     const
    // }
}

module.exports = TugasController;