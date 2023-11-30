var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var upload = require('./middleware/uploadFile'); // Import konfigurasi multer


// var multer = require('multer');


var app = express();

app.use(upload)
app.use(cors())  
  

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/image", express.static("./tmp/images"));

app.use('/', indexRouter);

module.exports = app;
