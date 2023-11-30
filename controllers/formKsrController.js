const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require('bcrypt')



class FormKsrController {
    async AddForm(req, res) {
        const { file, semester } = req.body;
        console.log(req.files);

        try {
            if (!req.files || !req.files[0]) {
                return res.status(400).json({
                    success: false,
                    message: "Tidak ada file yang diunggah",
                });
            }

            const formKsr = await prisma.fileksr.create({
                data: {
                    file: req.files[0].filename,
                    semester,
                },
            });
            res.json(formKsr);
        } catch (error) {
            console.log(error);
            console.error("Terjadi kesalahan saat menambahkan tugas");
            res
                .status(500)
                .json({ error: "Terjadi kesalahaan saat menambahkan tugas" });
        }

    }
}

module.exports = FormKsrController;