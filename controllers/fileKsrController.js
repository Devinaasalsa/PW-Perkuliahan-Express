const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require('bcrypt')


class FileKsrController {
    async addFile(req, res) {
        const { semester } = req.body;
        console.log(req.files);

        try {
            if (!req.files || !req.files[0]) {
                return res.status(400).json({
                    success: false,
                    message: "Tidak ada file yang diunggah",
                });
            }

            const fileKsr = await prisma.fileKsr.create({
                data: {
                    file: req.files[0].filename,
                    semester: parseInt(semester),
                },
            });
            res.json(fileKsr);
        } catch (error) {
            console.log(error);
            console.error("Terjadi kesalahan saat mengupload file");
            res
                .status(500)
                .json({ error: "Terjadi kesalahaan saat mengupload file" });
        }

    }
}

module.exports = FileKsrController;