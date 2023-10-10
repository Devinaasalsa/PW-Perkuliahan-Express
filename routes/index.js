const express = require('express');
const MahasiswaController = require('../controllers/mahasiswaController.js');


const router = express.Router();
const mahasiswaController = new MahasiswaController();

/* GET home page. */
router.get('/getMahasiswa', mahasiswaController.getAllMahasiswa);
router.post('/createMahasiswa', mahasiswaController.createMahasiswa);

module.exports = router;
