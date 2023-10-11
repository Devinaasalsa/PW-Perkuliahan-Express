const express = require('express');
const MahasiswaController = require('../controllers/mahasiswaController.js');
const MatkulController = require('../controllers/matkulController.js');
const DosenController = require('../controllers/dosenController.js');
const AbsensiController = require('../controllers/absensiController.js')

const router = express.Router();
const mahasiswaController = new MahasiswaController();
const matkulController = new MatkulController();
const dosenController = new DosenController();
const absensiController = new AbsensiController();

/* GET home page. */
router.get('/getMahasiswa', mahasiswaController.getAllMahasiswa);
router.get('/getMahasiswaById/:id', mahasiswaController.getMahasiswaById)
router.post('/createMahasiswa', mahasiswaController.createMahasiswa);
router.patch('/updateMahasiswa/:id', mahasiswaController.updateMahasiswa);
router.delete('/deleteMahasiswa/:id', mahasiswaController.deleteMahasiswa);

router.get('/getDosen', dosenController.getAllDosen);
router.get('/getDosenById/:id', dosenController.getDosenById)
router.post('/createDosen', dosenController.createDosen);
router.patch('/updateDosen/:id', dosenController.updateDosen);
router.delete('/deleteDosen/:id', dosenController.deleteDosen);


router.get('/getMatkul', matkulController.getAllMatkul);
// router.get('/getMahasiswaById/:id', mahasiswaController.getMahasiswaById)
router.post('/createMatkul', matkulController.createMatkul);
router.patch('/updateMatkul/:id', matkulController.updateMatkul);
router.delete('/deleteMatkul/:id', matkulController.deleteMatkul);


router.get('/getAbsen', absensiController.inputAbsensi);
router.post('/inputAbsen', absensiController.inputAbsensi);

module.exports = router;
