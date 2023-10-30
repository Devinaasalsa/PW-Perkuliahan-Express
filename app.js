var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var multer = require('multer');


var app = express();

app.use(
    multer({
      fileFilter: function  (req, file, cb) {
        if (
          !file.originalname.match(
            /\.(pdf|csv|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|xlsx)$/
          )
        ) {
          req.fileValidationError = "Only files are allowed!";
          return cb(new Error("Only files are allowed!"), false);
        }
        cb(null, true);
      },
      storage: multer.diskStorage({
        destination: "./tmp/images",
        filename: function (req, file, cb) {
          let fileName = file.originalname
            .split(".")[0]
            .replace(/\s/g, "-")
            .toLowerCase();
          cb(
            null,
            fileName + Date.now().toString() + path.extname(file.originalname)
          );
        },
      }),
    }).array("image", 12)
  );
  
  

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/image", express.static("./tmp/images"));

app.use('/', indexRouter);

module.exports = app;
