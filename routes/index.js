const express = require('express');
const MahasiswaController = require('../controllers/mahasiswaController.js'); 
const DosenController = require('../controllers/dosenController.js');


const router = express.Router();
const mahasiswaController = new MahasiswaController();
const dosenController = new DosenController();

/* GET home page. */
router.get('/getMahasiswa', mahasiswaController.getAllMahasiswa);
router.get('/getMahasiswaById/:id', mahasiswaController.getMahasiswaById)
router.post('/createMahasiswa', mahasiswaController.createMahasiswa);
router.patch('/updateMahasiswa/:id', mahasiswaController.updateMahasiswa);
router.delete('/deleteMahasiswa/:id', mahasiswaController.deleteMahasiswa);


router.get('/getDosen', dosenController.getAllDosen);
router.post('/createDosen', dosenController.createDosen)

module.exports = router;
