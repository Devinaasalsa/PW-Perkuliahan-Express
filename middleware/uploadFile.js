const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './tmp/images', // Sesuaikan dengan direktori penyimpanan yang Anda inginkan
  filename: function (req, file, cb) {
    let fileName = file.originalname
      .split('.')[0]
      .replace(/\s/g, '-')
      .toLowerCase();
    cb(null, fileName + Date.now().toString() + path.extname(file.originalname));
  },
});

const fileFilter = function (req, file, cb) {
  if (
    !file.originalname.match(
      /\.(pdf|pptx|xcsv|doc|docx|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|xlsx)$/
    )
  ) {
    req.fileValidationError = 'Only files are allowed!';
    return cb(new Error('Only files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).array('file', 12);

module.exports = upload;
