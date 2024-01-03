const express = require('express');
const RoleController = require('../controllers/roleController.js')
const MiddlewareAdmin = require('../middleware/middlewareAdmin.js');

const router = express.Router();
const roleController = new RoleController()
const middlewareAdmin = new MiddlewareAdmin();

// //routes role
router.get('/getRole', middlewareAdmin.isAdmin, roleController.getAllRole);
router.get('/getRoleById/:id', roleController.getRoleById);
router.post('/createRole', roleController.createRole);
router.patch('/updateRole/:id', roleController.updateRole)
router.delete('/deleteRole/:id', roleController.deleteRole)
router.get('/searchRole?', roleController.searchRole);

module.exports = router;
