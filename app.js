var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var session = require('express-session')
var flash = require('express-flash')

//digunakan untuk router admin
//folder admin
const pengurusRouter = require('./routes/admin/admin')

//digunakan untuk router pengguna
//folder pengguna
const penggunaRouter = require('./routes/pengguna/pengguna')

//digunakan untuk router pengurus
//folder buku
const bukuRouter = require('./routes/pengurus/buku/buku')
const kategoriBukuRouter = require('./routes/pengurus/buku/kategoriBuku')
const pengarangBukuRouter = require('./routes/pengurus/buku/pengarangBuku')
//folder data master
const bahasaRouter = require('./routes/pengurus/dataMaster/bahasa')
const  tempatTerbitRouter= require('./routes/pengurus/dataMaster/tempatTerbit')
const penerbitRouter = require('./routes/pengurus/dataMaster/penerbit')
//folder lokasi
const lantaiRouter = require('./routes/pengurus/lokasi/lantai')
const ruanganRouter = require('./routes/pengurus/lokasi/ruangan')
const rakRouter = require('./routes/pengurus/lokasi/rak')
//folder majalah
const majalahRouter = require('./routes/pengurus/majalah/majalah')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//middleware untuk menyimpan data login
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        secure: false, //ubah ke true jika sudah di hosting 
        maxAge: 600000000
    }
}))

//middleware untuk mengirim pesan
app.use(flash())

//digunakan untuk router admin
//folder admin
app.use('/admin/pengurus', pengurusRouter)

//digunakan untuk router pengguna
//folder pengguna
app.use('/', penggunaRouter)

//folder bahasa
app.use('/pengurus/bahasa', bahasaRouter)
//folder buku
app.use('/pengurus/buku', bukuRouter)
app.use('/pengurus/kategori-buku', kategoriBukuRouter)
app.use('/pengurus/pengarang-buku', pengarangBukuRouter)
//folder data master
app.use('/pengurs/bahasa', bahasaRouter)
app.use('/pengurus/tempat-terbit', tempatTerbitRouter)
app.use('/pengurus/penerbit', penerbitRouter)
//folder lokasi
app.use('/pengurus/lantai', lantaiRouter)
app.use('/pengurus/ruangan', ruanganRouter)
app.use('/pengurus/rak', rakRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;