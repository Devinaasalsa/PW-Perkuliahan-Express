const express = require('express');
const AbsensiController = require('../controllers/absensiController');
const MiddlewareDosen = require('../middleware/middlewareDosen');

const router = express.Router();
const absensiController = new AbsensiController();
const middlewareDosen = new MiddlewareDosen();


router.get('/getAbsen', middlewareDosen.isDosen, absensiController.getAbsensi);
router.post('/inputAbsen/',  middlewareDosen.isDosen, absensiController.inputAbsensi);
router.get('/getAbsenByMhsId/:id',  middlewareDosen.isDosen, absensiController.getLatestAbsenByMhsId);

module.exports = router;