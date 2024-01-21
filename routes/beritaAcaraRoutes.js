const express = require('express');
const AcaraBeritaController = require('../controllers/acara_beritaControllers');
const MiddlewareDosen = require('../middleware/middlewareDosen');
const MiddlewareAdmin = require('../middleware/middlewareAdmin');

const router = express.Router();
const acaraBeritaController = new AcaraBeritaController();
const middlewareDosen = new MiddlewareDosen();
const middlewareAdmin = new MiddlewareAdmin();


router.get('/getAcaraBerita', acaraBeritaController.getAllAcaraBerita)
router.get('/getAcaraDosen', middlewareDosen.isDosen, acaraBeritaController.getAcaraDosen)
router.post('/createAcaraBerita', middlewareDosen.isDosen, acaraBeritaController.createAcaraBerita)
router.put('/updateAcaraBerita/:id', middlewareDosen.isDosen, acaraBeritaController.updateAcaraBerita)
router.delete('/deleteAcaraBerita/:id', acaraBeritaController.deleteAcaraBerita)

module.exports = router;