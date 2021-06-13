var express = require('express');
const mongoose = require ('mongoose');
const cors = require ('cors');
const { Schema, model } = mongoose
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const personaSchema = new Schema({
    name    : { type: String },
    phone   : { type: String },
}, {
    timestamps: true,
    versionKey: false
})

const Persona = model('persona',personaSchema);

mongoose.connect('mongodb://localhost/angular-users', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then((db) => console.log('Se ha conectado a la base de datos'))
.catch((err) => console.log(err));

var indexRouter = require('./routes/index');
var personasRouter = require('./routes/personas');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS

app.use(function(req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
  
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  
    next();
  
  }); 

app.use('/', indexRouter);
app.use('/personas', personasRouter);

//Se define el puerto a utilizar
const port = 5000;

//Se inicia el servicio de escucha
app.listen(port, ()=> {
    console.log('Escuchando en http://localhost:'+ port);
});

module.exports = app;
