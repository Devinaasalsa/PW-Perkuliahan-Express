const express = require('express');
const MahasiswaController = require('../controllers/mahasiswaController.js'); 
const DosenController = require('../controllers/dosenController.js');
const AcaraBeritaController = require('../controllers/acara_beritaControllers.js')

const router = express.Router();
const mahasiswaController = new MahasiswaController();
const dosenController = new DosenController();
const acaraBeritaController = new AcaraBeritaController();

/* GET home page. */
router.get('/getMahasiswa', mahasiswaController.getAllMahasiswa);
router.get('/getMahasiswaById/:id', mahasiswaController.getMahasiswaById)
router.post('/createMahasiswa', mahasiswaController.createMahasiswa);
router.patch('/updateMahasiswa/:id', mahasiswaController.updateMahasiswa);
router.delete('/deleteMahasiswa/:id', mahasiswaController.deleteMahasiswa);

// routes of dosen page
router.get('/getDosen', dosenController.getAllDosen);
router.post('/createDosen', dosenController.createDosen)

//rute of acara berita page
router.get('/getAcaraBerita', acaraBeritaController.getAllAcaraBerita)
router.post('/createAcaraBerita', acaraBeritaController.createAcaraBerita)

module.exports = router;
