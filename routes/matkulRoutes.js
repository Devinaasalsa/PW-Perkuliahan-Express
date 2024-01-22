const express = require('express');
const DosenController = require('../controllers/dosenController');
const MiddlewareAdmin = require('../middleware/middlewareAdmin');
const MiddlewareMahasiswa = require('../middleware/middlewareMahasiswa');
const MatkulController = require('../controllers/matkulController');

const router = express.Router();
const dosenController = new DosenController();
const matkulController = new MatkulController();
const middlewareAdmin = new MiddlewareAdmin();
const middlewareMahasiswa = new MiddlewareMahasiswa();

// Define Matkul routes
router.get('/getMatkul', matkulController.getAllMatkul);
router.get('/getMatkulById/:id', matkulController.getMatkulById);
router.get('/getMatkulByDosen?', matkulController.getMatkulByDosen);


router.post('/createMatkul', matkulController.createMatkul);
router.patch('/updateMatkul/:id',  middlewareAdmin.isAdmin, matkulController.updateMatkul);
router.delete('/deleteMatkul/:id', middlewareAdmin.isAdmin, matkulController.deleteMatkul);
router.patch('/updateMatkul/:id', matkulController.updateMatkul);
router.delete('/deleteMatkul/:id', matkulController.deleteMatkul);
router.get('/searchMatkul?', matkulController.searchMatkul);

module.exports = router;
