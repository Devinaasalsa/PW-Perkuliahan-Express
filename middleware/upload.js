// const multer = require('multer');

// // Konfigurasi penyimpanan (storage) untuk multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Tentukan direktori tempat berkas akan disimpan
//     cb(null, 'uploads/'); // Sesuaikan dengan direktori yang Anda inginkan
//   },
//   filename: (req, file, cb) => {
//     // Tentukan nama berkas yang akan disimpan
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// // Inisialisasi multer dengan konfigurasi storage  
// const upload = multer({ storage: storage });

// module.exports = upload;
