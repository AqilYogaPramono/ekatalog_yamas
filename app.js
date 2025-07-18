var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var session = require('express-session')
var flash = require('express-flash')

var indexRouter = require('./routes/index');

//folder bahasa
const bahasaRouter = require('./routes/bahasa/bahasa')

//folder buku
const tempatTerbitBukuRouter = require('./routes/buku/tempatTerbitBuku')
const penerbitBukuRouter = require('./routes/buku/penerbitBuku')

//folder majalah
const penerbitMajalahRouter = require('./routes/majalah/penerbitMajalah')
const tempatTerbitMajalahRouter = require('./routes/majalah/tempatTerbitMajalah')

//folder lokasi
const lantaiRouter = require('./routes/lokasi/lantai')
const ruanganRouter = require('./routes/lokasi/ruangan')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

app.use('/', indexRouter);

//folder bahasa
app.use('/pengurus/bahasa', bahasaRouter)

//folder buku
app.use('/pengurus/tempat-terbit-buku', tempatTerbitBukuRouter)
app.use('/pengurus/penerbit-buku', penerbitBukuRouter)

//folder majalah
app.use('/pengurus/penerbit-majalah', penerbitMajalahRouter)
app.use('/pengurus/tempat-terbit-majalah', tempatTerbitMajalahRouter)

//folder lokasi
app.use('/pengurus/lanati', lantaiRouter)
app.use('/pengurusu/ruangan', ruanganRouter)

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
