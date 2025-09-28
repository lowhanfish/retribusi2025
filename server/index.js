const express = require('express');
// const volleyball = require('volleyball');
const cors = require('cors');
var path = require("path");

require('dotenv').config();



const app = express();

const middleware = require('./auth/middlewares');
const auth = require('./auth');


// app.use(volleyball);

app.use(cors({
  // origin : 'http://localhost:8081'
  origin : '*'
}));
app.use(express.json());

app.use(middleware.checkTokenSeetUser);


app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨Hello pengunjung,,, Anda mengunjugi alamat yg salah... mungkin maksud anda http://konaweselatankab.go.id ! 🌈✨🦄',
    user : req.user
  });
});


app.use('/auth', auth);
app.use('/uploads', express.static(path.join(__dirname, './uploads')))

    // ================================== BATAS =====================================================


      const test_connections = require('./apiMysql/test_connections');
      app.use('/api/v1/test_connections', middleware.isLoggedIn, test_connections);

    
    // =================== SERVER =====================

    const kecamatan = require('./apiMysql/dataMaster/kecamatan');
    app.use('/api/v1/kecamatan', middleware.isLoggedIn, middleware.sideMenuMidleware, kecamatan);

    const dm_menuList = require('./apiMysql/dataMaster/authorization/menuList');
    app.use('/api/v1/dm_menuList', middleware.isLoggedIn, middleware.sideMenuMidleware, dm_menuList);

    const dm_kelompokUsers = require('./apiMysql/dataMaster/authorization/kelompokUsers');
    app.use('/api/v1/dm_kelompokUsers', middleware.isLoggedIn, middleware.sideMenuMidleware, dm_kelompokUsers);

    const dm_registrasi = require('./apiMysql/dataMaster/authorization/registrasi');
    app.use('/api/v1/dm_registrasi', middleware.isLoggedIn, middleware.sideMenuMidleware, dm_registrasi);

    const dm_unitKerja = require('./apiMysql/dataMaster/unitKerja');
    app.use('/api/v1/dm_unitKerja', middleware.isLoggedIn, dm_unitKerja);

    const dm_instansi = require('./apiMysql/dataMaster/instansi');
    app.use('/api/v1/dm_instansi', middleware.isLoggedIn, dm_instansi);

    const dm_biodata = require('./apiMysql/dataMaster/biodata');
    app.use('/api/v1/dm_biodata', middleware.isLoggedIn, dm_biodata);

    const masterPasar = require('./apiMysql/dataMaster/masterPasar');
    app.use('/api/v1/masterPasar', middleware.isLoggedIn, masterPasar);

    const regisLapak = require('./apiMysql/dataMaster/regisLapak');
    app.use('/api/v1/regisLapak', middleware.isLoggedIn, regisLapak);

    const jenisLapak = require('./apiMysql/dataMaster/jenisLapak');
    app.use('/api/v1/jenisLapak', middleware.isLoggedIn, jenisLapak);

    const jenisDagangan = require('./apiMysql/dataMaster/jenisDagangan');
    app.use('/api/v1/jenisDagangan', middleware.isLoggedIn, jenisDagangan);



    const checkAuth = require('./apiMysql/checkAuth');
    app.use('/api/v1/checkAuth', middleware.isLoggedIn, checkAuth);



    // =================== SERVER =====================





    
    
    
    // ================================== BATAS =====================================================
    
    // >>>>>>> d3108e8369f9f0f379270f0f6f53f5b9ef7abde6
    
    // const checkAbsenOtomatis = require('./apiMysql/library/checkAbsenOtomatis');
    // checkAbsenOtomatis.checkKehadiranOtomatis();

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found data - ' + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5028;
const server = app.listen(port, '0.0.0.0', () => {
  console.log('Listening on port', port);
});