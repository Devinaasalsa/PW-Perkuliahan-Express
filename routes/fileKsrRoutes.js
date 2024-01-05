const express = require('express');
const FileKsrController = require('../controllers/fileKsrController');
const MiddlewareDosen = require('../middleware/middlewareDosen');
const MiddlewareMahasiswa = require('../middleware/middlewareMahasiswa');

const router = express.Router();
const KsrController = new FileKsrController();
const middlewareDosen = new MiddlewareDosen();
const middlewareMahasiswa = new MiddlewareMahasiswa();


router.post('/addFile', middlewareDosen.isDosen, KsrController.addFile);
router.post('/uploadKsrMahasiswa/:ksrId',  middlewareMahasiswa.isMahasiswa, KsrController.uploadKsrMahasiswa);

module.exports = router;