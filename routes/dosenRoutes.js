const express = require('express');
const DosenController = require('../controllers/dosenController');
const MiddlewareAdmin = require('../middleware/middlewareAdmin');
const MiddlewareDosen = require('../middleware/middlewareDosen');

const router = express.Router();
const dosenController = new DosenController();
const middlewareDosen = new MiddlewareDosen();
const middlewareAdmin = new MiddlewareAdmin();

// Define Dosen routes
router.get('/getDosen', middlewareAdmin.isAdmin, dosenController.getAllDosen);
router.get('/getDosen/:id', dosenController.getDosenById);
router.post('/createDosen', middlewareAdmin.isAdmin, dosenController.createDosen);
router.patch('/updateDosen/:id', middlewareAdmin.isAdmin, dosenController.updateDosen);
router.delete('/deleteDosen/:id', middlewareAdmin.isAdmin, dosenController.deleteDosen);
router.get('/searchDosen', dosenController.searchDosen);

module.exports = router;
