const express = require('express');
const DosenController = require('../controllers/dosenController');
const MiddlewareDosen = require('../middleware/middlewareDosen');

const router = express.Router();
const dosenController = new DosenController();
const middlewareDosen = new MiddlewareDosen();

// Define Dosen routes
router.get('/getDosen', middlewareDosen.isDosen, dosenController.getAllDosen);
router.get('/getDosenById/:id', middlewareDosen.isDosen, dosenController.getDosenById);
router.post('/createDosen', dosenController.createDosen);
router.patch('/updateDosen/:id', middlewareDosen.isDosen, dosenController.updateDosen);
router.delete('/deleteDosen/:id', middlewareDosen.isDosen, dosenController.deleteDosen);
router.get('/searchDosen', dosenController.searchDosen);

module.exports = router;
