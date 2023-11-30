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
const MiddlewareAdmin = require('../middleware/middlewareAdmin.js');
const AdminController = require('../controllers/adminController.js')


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
const middlewareAdmin = new MiddlewareAdmin();
const adminController = new AdminController();



const isAdmin = middlewareAdmin.isAdmin;
const isMahasiswa = middlewareMahasiswa.isMahasiswa;
const isDosen = middlewareDosen.isDosen;

router.get('/getMahasiswa', mahasiswaController.getAllMahasiswa);
router.get('/getMahasiswaById/:id', mahasiswaController.getMahasiswaById)
router.post('/createMahasiswa', mahasiswaController.createMahasiswa);
router.patch('/updateMahasiswa/:id', isAdmin, mahasiswaController.updateMahasiswa);
router.delete('/deleteMahasiswa/:id', isAdmin, mahasiswaController.deleteMahasiswa);
router.get('/searchMahasiswa?', mahasiswaController.searchMahasiswa);


router.get('/getAdmin', isAdmin, adminController.getAllAdmin);
router.post('/createAdmin',  adminController.createAdmin);
router.patch('/updateAdmin/:id', isAdmin, adminController.updateAdmin);
router.delete('/deleteAdmin/:id', isAdmin, adminController.deleteAdmin);
router.get('/searchAdmin?', adminController.searchAdmin);


// routes of dosen page
router.get('/getDosen', isAdmin,dosenController.getAllDosen);
router.get('/getDosenById/:id', isAdmin,dosenController.getDosenById)
router.post('/createDosen',dosenController.createDosen);
router.patch('/updateDosen/:id', isAdmin,dosenController.updateDosen);
router.delete('/deleteDosen/:id', isAdmin,dosenController.deleteDosen);
router.get('/searchDosen?', dosenController.searchDosen);


//routes matkul
router.get('/getMatkul', isDosen, isMahasiswa, matkulController.getAllMatkul);
router.get('/getMatkulById/:id', matkulController.getMatkulById);
router.post('/createMatkul', matkulController.createMatkul);
router.patch('/updateMatkul/:id', matkulController.updateMatkul);
router.delete('/deleteMatkul/:id', matkulController.deleteMatkul);
router.get('/searchMatkul?', matkulController.searchMatkul);


//routes absensi
router.get('/getAbsen', absensiController.getAbsensi);
router.post('/inputAbsen/', absensiController.inputAbsensi);
router.get('/getAbsenByMhsId/:id', absensiController.getLatestAbsenByMhsId);

//routes role
router.get('/getRole', isAdmin, roleController.getAllRole);
router.get('/getRoleById/:id', roleController.getRoleById);
router.post('/createRole', roleController.createRole);
router.patch('/updateRole/:id', roleController.updateRole)
router.delete('/deleteRole/:id', roleController.deleteRole)
router.get('/searchRole?', roleController.searchRole);


//rute of acara berita page
router.get('/getAcaraBerita', isMahasiswa, acaraBeritaController.getAllAcaraBerita)
router.post('/createAcaraBerita', acaraBeritaController.createAcaraBerita)
router.put('/updateAcaraBerita/:id', acaraBeritaController.updateAcaraBerita)
router.delete('/deleteAcaraBerita/:id', acaraBeritaController.deleteAcaraBerita)

//route nilai
router.post('/inputAllNilai/:id', nilaiController.sumNilai)

router.get('/getTugas', tugasController.getAllTugas)
router.get('/getTugas/:id', tugasController.getTugasById)
router.post('/createTugas', isDosen, tugasController.createTugas)
router.put('/updateTugas/:id', tugasController.updateTugas)
router.put('/updateNilai/:id', tugasController.updateNilaiTugas)
router.put('/kumpulkanTugas/:tugasId', tugasController.kumpulkanTugas)
router.get('/getKumpulkanTugas/:tugasId', tugasController.getTugasKumpulkanById)
router.get('/getAllKumpulkanTugas', tugasController.getAllKumpulkanTugas)
router.get('/searchTugas?', tugasController.searchTugas);

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
