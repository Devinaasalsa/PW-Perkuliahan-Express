const express = require('express');
const AuthController = require('../controllers/authController');
const MiddlewareDosen = require('../middleware/middlewareDosen');

const router = express.Router();
const authController = new AuthController();

router.post('/login', authController.LoginMahasiswa)

module.exports = router;