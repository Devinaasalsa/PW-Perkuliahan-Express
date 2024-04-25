const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require('bcrypt')
const { jwtDecode } = require('jwt-decode');


class FileKsrController {
    async uploadKsrMahasiswa(req, res) {
        const authHeader = req.header('Authorization');
        const { ksrId } = req.params;


        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header not provided' });
        }

        const tokenParts = authHeader.split(' ');

        const token = tokenParts[1];
        let decoded;

        console.log(ksrId)
        const existingKsr = await prisma.fileKsr.findUnique({
            where: {
                id: parseInt(ksrId),
            },
        });
        
        if (!existingKsr) {
            return res.status(404).json({ error: "File Ksr not found" });
        }

        console.log("ksrId:", existingKsr.id);
        try {
            decoded = jwtDecode(token);
            // console.log("decoded:",decoded);

            const user = await prisma.user.findFirst({
                where: {
                    username: decoded.username,
                },
                include: {
                    mahasiswa: true,
                },
            });

            if (!req.files || !req.files[0]) {
                return res.status(400).json({
                    success: false,
                    message: "Tidak ada file yang diunggah",
                });
            }
            const mhsId = decoded.mhsId;
            // Check if the Mahasiswa has already submitted for the current semester
            const existingSubmission = await prisma.ksrMahasiswa.findFirst({
                where: {
                    mhsId: mhsId,
                    FileKsrID: existingKsr.id
                },
            });

            if (existingSubmission) {
                return res.status(400).json({ message: 'Mahasiswa telah mengumpulkan file KSR untuk semester ini' });
            }

            const ksrMahasiswa = await prisma.ksrMahasiswa.create({
                data: {
                    file: req.files[0].filename,
                    mhsId: mhsId,
                    FileKsrID: existingKsr.id
                                },
            });

            res.json(ksrMahasiswa);
        } catch (error) {
            console.log(error);
            console.error("Terjadi kesalahan saat mengupload file");
            res.status(500).json({ error: "Terjadi kesalahan saat mengupload file" });
        }
    }

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

    async getFile(req, res) {
        try {
            const files = await prisma.fileKsr.findMany();
            res.status(200).json(files);
          } catch (error) {
            console.error("Terjadi kesalahan saat menampilkan file", error);
            res
              .status(500)
              .json({ error: "Terjadi kesalahan saat menampilkan file" });
          }
        }
    }


module.exports = FileKsrController;