// const multer = require('multer');
// const path = require('path');

// // const storage = multer.diskStorage({
// //   destination: './tmp/uploads', // Sesuaikan dengan direktori penyimpanan yang Anda inginkan
// //   filename: function (req, file, cb) {
// //     let fileName = file.originalname
// //       .split('.')[0]
// //       .replace(/\s/g, '-')
// //       .toLowerCase();
// //     cb(null, fileName + Date.now().toString() + path.extname(file.originalname));
// //   },
// // });

// const fileFilter = function (req, file, cb) {
//   if (
//     !file.originalname.match(
//       /\.(xlsx)$/
//     )
//   ) {
//     req.fileValidationError = 'Only excel are allowed!';
//     return cb(new Error('Only files are allowed!'), false);
//   }
//   cb(null, true);
// };

// const uploadExcel = multer({
//   storage: storage,
//   fileFilter: fileFilter,
// }).single('uploadfile');

// module.exports = uploadExcel;
