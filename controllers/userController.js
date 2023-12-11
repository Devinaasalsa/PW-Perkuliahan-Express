// const {PrismaClient} = require('@prisma/client');
// const prisma = new PrismaClient()

// const multer = require('multer');
// const ExcelJS = require('exceljs');

// const upload = multer({ dest: 'uploads/' });


// class UserController {
//      async uploadExcelUser(req, res) {
//         try {
//             const workbook = new ExcelJS.Workbook();
//             await workbook.xlsx.readFile(req.file.path);
        
//             const worksheet = workbook.getWorksheet(1);
        
//             for (let i = 2; i <= worksheet.rowCount; i++) {
//                 const [username, password, roleId, mhsName, tanggalLahir, alamat, nim] = worksheet.getRow(i).values;

//                 await prisma.user.create({
//                   data: {
//                     username,
//                     password,
//                     roleId,
//                     mahasiswa: {
//                       create: {
//                         mhsName,
//                         tanggalLahir,
//                         alamat,
//                         nim,
//                       },
//                     },
//                   },
//                 });
//             }
        
//             res.status(200).json({ message: 'Data successfully imported to the database' });
//           } catch (error) {
//             console.error('Error:', error);
//             res.status(500).json({ error: 'Internal Server Error' });
//           }
//         };
    
// }

// module.exports = UserController;

