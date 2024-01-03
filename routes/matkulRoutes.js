const express = require('express');
const DosenController = require('../controllers/dosenController');
const MiddlewareDosen = require('../middleware/middlewareDosen');
const MiddlewareMahasiswa = require('../middleware/middlewareMahasiswa');
const MatkulController = require('../controllers/matkulController');

const router = express.Router();
const dosenController = new DosenController();
const matkulController = new MatkulController();
const middlewareDosen = new MiddlewareDosen();
const middlewareMahasiswa = new MiddlewareMahasiswa();

// Define Dosen routes
router.get('/getMatkul', middlewareDosen.isDosen, middlewareMahasiswa.isMahasiswa, matkulController.getAllMatkul);
router.get('/getMatkulById/:id', matkulController.getMatkulById);
router.post('/createMatkul', matkulController.createMatkul);
router.patch('/updateMatkul/:id',  middlewareDosen.isDosen, matkulController.updateMatkul);
router.delete('/deleteMatkul/:id', middlewareDosen.isDosen, matkulController.deleteMatkul);
router.patch('/updateMatkul/:id', matkulController.updateMatkul);
router.delete('/deleteMatkul/:id', matkulController.deleteMatkul);
router.get('/searchMatkul?', matkulController.searchMatkul);

module.exports = router;
