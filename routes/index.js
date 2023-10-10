const express = require('express');
const MahasiswaController = require('../controllers/mahasiswaController.js');


const router = express.Router();
const mahasiswaController = new MahasiswaController();

/* GET home page. */
router.get('/getMahasiswa', mahasiswaController.getAllMahasiswa);
router.get('/getMahasiswaById/:id', mahasiswaController.getMahasiswaById)
router.post('/createMahasiswa', mahasiswaController.createMahasiswa);
router.patch('/updateMahasiswa/:id', mahasiswaController.updateMahasiswa);
router.delete('/deleteMahasiswa/:id', mahasiswaController.deleteMahasiswa);

module.exports = router;
