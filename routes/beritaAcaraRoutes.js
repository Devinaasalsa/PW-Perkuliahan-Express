const express = require('express');
const AcaraBeritaController = require('../controllers/acara_beritaControllers');
const MiddlewareMahasiswa = require('../middleware/middlewareMahasiswa');

const router = express.Router();
const acaraBeritaController = new AcaraBeritaController();
const middlewareMahasiswa = new MiddlewareMahasiswa();


router.get('/getAcaraBerita', middlewareMahasiswa.isMahasiswa, acaraBeritaController.getAllAcaraBerita)
router.post('/createAcaraBerita', acaraBeritaController.createAcaraBerita)
router.put('/updateAcaraBerita/:id', acaraBeritaController.updateAcaraBerita)
router.delete('/deleteAcaraBerita/:id', acaraBeritaController.deleteAcaraBerita)

module.exports = router;