const express = require('express');
const NilaiController = require('../controllers/nilaiController');
const MiddlewareDosen = require('../middleware/middlewareDosen');

const router = express.Router();
const nilaiController = new NilaiController();
const middlewareDosen = new MiddlewareDosen();

// Define Nilai routes
router.post('/inputAllNilai/:id', middlewareDosen.isDosen, nilaiController.sumNilai)
router.get('/getNilai/:id',  nilaiController.getNilai)

module.exports = router;
