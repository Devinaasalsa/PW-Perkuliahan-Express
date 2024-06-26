const express = require('express');
const TugasController = require('../controllers/tugasController.js')
const MiddlewareDosen = require('../middleware/middlewareDosen.js');

const router = express.Router();
const tugasController = new TugasController()
const middlewareDosen = new MiddlewareDosen();

router.get('/getTugas', tugasController.getAllTugas)
router.get('/getTugas/:id', tugasController.getTugasById)

//buat get topik tugas sesuai mata kuliah
router.get('/getTugasByMatkul/:matkulId', tugasController.getTugasByMatkul)

//get tugas sesuai topik yang dipilih
router.get('/getTugasByTopik?', tugasController.getTugasByTopik)

//buat get detail tugas (desc, lampiran, dll)
router.get('/getMahasiswaByTugasId/:tugasId', tugasController.getMahasiswaByTugasId)

// router.get('/getTugasByMahasiswa/:mhsId', tugasController.getTugasByMahasiswa)



router.post('/createTugas/:matkulId', middlewareDosen.isDosen, tugasController.createTugas)
router.put('/updateTugas/:id', tugasController.updateTugas)
router.put('/updateNilai/:tugasId', tugasController.updateNilaiTugas);
router.put('/kumpulkanTugas/:tugasId', tugasController.kumpulkanTugas)
router.get('/getKumpulkanTugas/:tugasId', tugasController.getTugasKumpulkanById)
router.get('/getAllKumpulkanTugas', tugasController.getAllKumpulkanTugas)
router.get('/searchTugas?', tugasController.searchTugas);

module.exports = router;
