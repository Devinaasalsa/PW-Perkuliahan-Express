const express = require('express');

const router = express.Router();
const excelValidate = require('../middleware/validateExcel.js');
const uploadFile = require('../middleware/uploadFile.js');
const UserController = require('../controllers/userController.js')

const userController = new UserController();


router.post('/uploadExcelUser', userController.uploadExcelUser)

module.exports = router;
