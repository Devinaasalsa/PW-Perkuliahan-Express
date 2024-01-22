const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const ExcelJS = require('exceljs');
const bcrypt = require('bcrypt');

const upload = multer({ dest: 'uploads/' });

class UserController {
  async uploadExcelUser(req, res) {
    // return console.log('halo')
    try {
      console.log(req.files)
      if (!req.files) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(req.files[0].path);

      const worksheet = workbook.getWorksheet(1);

      const mahasiswaPromises = [];
      const userPromises = [];

      worksheet.eachRow(async (row, rowNumber) => {

        if (rowNumber > 1) {
          const [nim, mhsName, tempatLahir, tanggalLahir, alamat] = row.values.slice(1);
          const newMahasiswa = [nim, mhsName, tempatLahir, tanggalLahir, alamat]
          console.log(row.values.slice(1));
          const existingNim = await prisma.mahasiswa.findUnique({
            where: {
              nim: nim,
            },
          });
          if (existingNim) {
            return res.status(500).json({
              error: "Gagal mendaftarkan mahasiswa, NIM telah terdaftar",
            });
            return;
          }
          console.log(existingNim);

          const mahasiswaPromise = await prisma.mahasiswa.create({
            data: {
              mhsName, nim, tempatLahir, tanggalLahir, alamat
            }
          });

          mahasiswaPromises.push(mahasiswaPromise);

          const mahasiswas = await Promise.all(mahasiswaPromises);

          for (const mahasiswa of mahasiswas) {
            const { mhsName, nim } = mahasiswa;


            const hashedPassword = await bcrypt.hash(nim, 10);

            const usersPromise = await prisma.user.create({
              data: {
                username: mhsName,
                password: hashedPassword,
                roleId: 3,
                mhsId: mahasiswa.id,
              },
            });

            userPromises.push(usersPromise);
          }

          await Promise.all(userPromises);
        }
      });



      res.json({ message: 'Mahasiswa and User records created successfully.' });
    } catch (error) {
      console.error('Error uploading Excel file:', error);
      res.status(500).json({ error: 'Error uploading Excel file.' });
    } finally {
      // Cleanup: Delete the uploaded file
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
    }
  }

  async getAllUser(req, res) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          roleId: true,
          mhsId: true,
          dosenId: true,
          adminId: true,
          createdAt: true,
          updateAt: true,
        },
      });
      res.status(200).json(users);
    } catch (error) {
      console.error("Terjadi kesalahan saat menampilkan data User", error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menampilkan data User" });
    }
  }
}

module.exports = UserController;

