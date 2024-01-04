const express = require('express');
const AdminController = require('../controllers/adminController');
const MiddlewareAdmin = require('../middleware/middlewareAdmin');

const router = express.Router();
const adminController = new AdminController();
const middlewareAdmin = new MiddlewareAdmin();


router.get('/getAdmin', middlewareAdmin.isAdmin, adminController.getAllAdmin);
router.get('/searchAdmin?',  middlewareAdmin.isAdmin, adminController.searchAdmin);
router.post('/createAdmin',  middlewareAdmin.isAdmin, adminController.createAdmin);
router.put('/updateAdmin/:id',  middlewareAdmin.isAdmin, adminController.updateAdmin);

module.exports = router;