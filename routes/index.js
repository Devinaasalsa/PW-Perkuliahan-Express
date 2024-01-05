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
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');
const eventRoutes = require('./listEventRoutes')
const fileKsr = require('./fileKsrRoutes')

const app = express();


// Use the routes
app.use('/', 
absensiRoutes, 
userRoutes, 
tugasRoutes, 
authRoutes, 
beritaAcaraRoutes, 
mahasiswaRoutes, 
dosenRoutes, 
matkulRoutes, 
nilaiRoutes, 
roleRoutes,
adminRoutes,
eventRoutes,
fileKsr
);
// ... use other routes

module.exports = app;

