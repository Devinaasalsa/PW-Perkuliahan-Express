import express from "express";
import {
  getMahasiswa,
} from "../controllers/mahasiswaController.js"


const router = express.Router();

/* GET home page. */
router.get('/getMahasiswa', getMahasiswa);

module.exports = router;
