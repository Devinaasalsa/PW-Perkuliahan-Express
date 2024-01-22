const express = require('express');
const FileKsrController = require('../controllers/fileKsrController');
const MiddlewareDosen = require('../middleware/middlewareDosen');
const MiddlewareMahasiswa = require('../middleware/middlewareMahasiswa');

const router = express.Router();
const KsrController = new FileKsrController();
const middlewareDosen = new MiddlewareDosen();
const middlewareMahasiswa = new MiddlewareMahasiswa();


router.get('/getFileKsr', KsrController.getFile);
router.post('/addFile', KsrController.addFile);
router.post('/uploadKsrMahasiswa/:ksrId',  middlewareMahasiswa.isMahasiswa, KsrController.uploadKsrMahasiswa);

module.exports = router;