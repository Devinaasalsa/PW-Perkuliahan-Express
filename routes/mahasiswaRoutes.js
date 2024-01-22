const express = require('express');
const MahasiswaController = require('../controllers/mahasiswaController');
const MiddlewareAdmin = require('../middleware/middlewareAdmin');

const router = express.Router();
const mahasiswaController = new MahasiswaController();
const middlewareAdmin = new MiddlewareAdmin();

// Define Mahasiswa routes
router.get('/getMahasiswa', mahasiswaController.getAllMahasiswa);
router.get('/getMahasiswaById/:id', mahasiswaController.getMahasiswaById);
router.post('/createMahasiswa', middlewareAdmin.isAdmin, mahasiswaController.createMahasiswa);
router.patch('/updateMahasiswa/:id', middlewareAdmin.isAdmin, mahasiswaController.updateMahasiswa);
router.delete('/deleteMahasiswa/:id', middlewareAdmin.isAdmin, mahasiswaController.deleteMahasiswa);
router.get('/searchMahasiswa', mahasiswaController.searchMahasiswa);

module.exports = router;
