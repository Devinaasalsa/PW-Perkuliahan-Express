const express = require('express');
const MahasiswaController = require('../controllers/mahasiswaController.js');
const MatkulController = require('../controllers/matkulController.js');
const DosenController = require('../controllers/dosenController.js');
const AcaraBeritaController = require('../controllers/acara_beritaControllers.js')
const AbsensiController = require('../controllers/absensiController.js')
const RoleController = require('../controllers/roleController.js')
const NilaiController = require('../controllers/nilaiController.js')
const TugasController = require('../controllers/tugasController.js')
const LoginController = require('../controllers/loginController.js')
const MiddlewareMahasiswa = require('../middleware/middlewareMahasiswa');
const MiddlewareDosen = require('../middleware/middlewareDosen.js');

const router = express.Router();
const mahasiswaController = new MahasiswaController();
const matkulController = new MatkulController();
const dosenController = new DosenController();
const acaraBeritaController = new AcaraBeritaController();
const absensiController = new AbsensiController();
const nilaiController = new NilaiController();
const roleController = new RoleController()
const tugasController = new TugasController()
const loginController = new LoginController()
const middlewareMahasiswa = new MiddlewareMahasiswa()
const middlewareDosen = new MiddlewareDosen();


router.get('/getMahasiswa', mahasiswaController.getAllMahasiswa);
router.get('/getMahasiswaById/:id', mahasiswaController.getMahasiswaById)
router.post('/createMahasiswa', mahasiswaController.createMahasiswa);
router.patch('/updateMahasiswa/:id', mahasiswaController.updateMahasiswa);
router.delete('/deleteMahasiswa/:id', mahasiswaController.deleteMahasiswa);

// routes of dosen page
router.get('/getDosen', dosenController.getAllDosen);
router.get('/getDosenById/:id', dosenController.getDosenById)
router.post('/createDosen', dosenController.createDosen);
router.patch('/updateDosen/:id', dosenController.updateDosen);
router.delete('/deleteDosen/:id', dosenController.deleteDosen);

//routes matkul
router.get('/getMatkul',  middlewareDosen.isDosen, matkulController.getAllMatkul);
router.get('/getMatkulById/:id', matkulController.getMatkulById);
router.post('/createMatkul', middlewareDosen.isDosen, matkulController.createMatkul);
router.patch('/updateMatkul/:id', matkulController.updateMatkul);
router.delete('/deleteMatkul/:id', matkulController.deleteMatkul);

//routes absensi
router.get('/getAbsen', absensiController.getAbsensi);
router.post('/inputAbsen', absensiController.inputAbsensi);

//routes role
router.get('/getRole', roleController.getAllRole);
router.get('/getRoleById/:id', roleController.getRoleById);
router.post('/createRole', roleController.createRole);
router.patch('/updateRole/:id', roleController.updateRole)
router.delete('/deleteRole/:id', roleController.deleteRole)

//rute of acara berita page
router.get('/getAcaraBerita', middlewareMahasiswa.isMahasiswa, acaraBeritaController.getAllAcaraBerita)
router.post('/createAcaraBerita', acaraBeritaController.createAcaraBerita)
router.put('/updateAcaraBerita/:id', acaraBeritaController.updateAcaraBerita)
router.delete('/deleteAcaraBerita/:id', acaraBeritaController.deleteAcaraBerita)

//route nilai
router.post('/inputAllNilai', nilaiController.sumNilai)

router.get('/getTugas', tugasController.getAllTugas)
router.get('/getTugas/:id', tugasController.getTugasById)
router.post('/createTugas', middlewareDosen.isDosen,tugasController.createTugas)
router.put('/updateTugas/:id', middlewareDosen.isDosen, tugasController.updateTugas)

router.post('/login', loginController.LoginMahasiswa)
// router.post('/login/dosen', loginController.getDosenById)

//logoutzz


router.post("/logout", (req, res) => {
  // Lakukan tindakan logout di sini
  // Misalnya, menghapus token dari tempat penyimpanan di sisi klien
  try {
    delete req.headers["authorization"];
    res.json({ message: "Logout berhasil" });
  } catch (error) {
    console.log(error);
    res.json({
      error,
      statusCode: 500,
      message: "gagal Logout",
    });
  }
});


module.exports = router;
