const express = require('express');
const absensiRoutes = require('./absensiRoutes');
const authRoutes = require('./authRoutes');
const beritaAcaraRoutes = require('./beritaAcaraRoutes');
const dosenRoutes = require('./dosenRoutes');
const mahasiswaRoutes = require('./mahasiswaRoutes');
const matkulRoutes = require('./matkulRoutes');
const nilaiRoutes = require('./nilaiRoutes');
const roleRoutes = require('./roleRoutes');
const tugasRoutes = require('./tugasRoutes');
const excelRoutes = require('./excelImportRoutes');


const app = express();

// ... other middleware setup

// Use the routes
app.use('/absensi', absensiRoutes);
app.use('/auth', authRoutes);
app.use('/beritaAcara', beritaAcaraRoutes);
app.use('/mahasiswa', mahasiswaRoutes);
app.use('/dosen', dosenRoutes);
app.use('/matkul', matkulRoutes);
app.use('/nilai', nilaiRoutes);
app.use('/role', roleRoutes);
app.use('/tugas', tugasRoutes);
app.use('/upload', excelRoutes);
// ... use other routes

module.exports = app;

