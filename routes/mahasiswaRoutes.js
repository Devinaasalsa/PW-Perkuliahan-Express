const express = require('express');
const MahasiswaController = require('../controllers/mahasiswaController');
const MiddlewareMahasiswa = require('../middleware/middlewareMahasiswa');

const router = express.Router();
const mahasiswaController = new MahasiswaController();
const middlewareMahasiswa = new MiddlewareMahasiswa();

// Define Mahasiswa routes
router.get('/getMahasiswa', mahasiswaController.getAllMahasiswa);
router.get('/getMahasiswaById/:id', mahasiswaController.getMahasiswaById);
router.post('/createMahasiswa', mahasiswaController.createMahasiswa);
router.patch('/updateMahasiswa/:id', middlewareMahasiswa.isMahasiswa, mahasiswaController.updateMahasiswa);
router.delete('/deleteMahasiswa/:id', middlewareMahasiswa.isMahasiswa, mahasiswaController.deleteMahasiswa);
router.get('/searchMahasiswa', mahasiswaController.searchMahasiswa);

module.exports = router;
