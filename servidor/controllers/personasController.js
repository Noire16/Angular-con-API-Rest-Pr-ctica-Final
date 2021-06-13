const { validationResult } = require("express-validator");

var db = require ('../db')
var mongodb = require ('mongodb');


//Conectar con la base de datos
db.connect('mongodb://localhost:27017', function(err){
    if(err){
        throw ('Fallo al conectar con la base de datos');
    }
});

//Metodo GET para devolver listado
module.exports.personas_list = function(req, res, next){
    db.get().db('apidb').collection('personas').find().toArray(function(err,result){
        if(err){
            throw ('Fallo al conectar con la base de datos');     
        }else{
            res.send(result);
        }
    })
};

//Método GET para devolver un solo usuario mediante su ID
module.exports.personas_find_one= function(req,res,next){
    if (db.get()===null) {
        next (new Error('La conexión no está establecida'));
        return;
    }
    const filter = {_id: new mongodb.ObjectID(req.params.id)};

    db.get().db('apidb').collection('personas').findOne(filter, function(err, result){
        //Si se produjo un error, enviar dicho error a la siguiente función
        if(err){
            next (new Error('Fallo en la conexión con MongoDb'));
            return;
        }else{
            //Si todo ha ido bien, devolver el resultado al cliente
            res.send(result);
        }
    })  
}

//Método POST para crear nueva persona
module.exports.personas_create = function(req,res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()});
    }

    if (db.get()===null){
        next (new Error ('La conexión no está establecida'));
        return;
    }
    const persona = {};
    persona.name = req.body.name
    persona.surnames = req.body.surnames
    persona.age = req.body.age
    persona.dni = req.body.dni
    persona.birthday = req.body.birthday
    persona.favouriteColour = req.body.favouriteColour
    persona.sex = req.body.sex

    //Insertar una persona
    db.get().db('apidb').collection('personas').insertOne (persona,function(err,result){
        //Si se produjo un error, enviar dicho error a la siguiente función
        if (err){
            next (new Error('Fallo en la conexión con MongoBD'));
            return;
        }else{
            //Si todo ha ido bien, devolver el resultado al cliente
            res.send(result);
        }
    })
};

//Método PUT para actualizar una persona
module.exports.personas_update_one = function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    if (db.get()===null) {
        next (new Error ('La conexión no está establecida'));
        return;
    }
    const filter ={_id: new mongodb.ObjectID(req.params.id)};
    const update = {$set: {name: req.body.name, surnames:req.body.surnames, age:req.body.age, dni:req.body.dni, birthday:req.body.birthday, favouriteColour:req.body.favouriteColour, sex:req.body.sex}};

// Insertar un documento
    db.get().db('apidb').collection('personas').updateOne(filter, update, function (err, result) {
        // Si se produjo un error, enviar dicho error a la siguiente función
        if (err) {
            next ( new Error('Fallo en la conexión con MongoBD') );
            return;
        } else {
        // Si todo ha ido bien, devolver el resultado al cliente
            res.send(result);
        }
    });
};

//Método DELETE para eliminar una persona
module.exports.personas_delete_one = function(req,res,next){
    if (db.get()===null) {
        next (new Error('La conexión no está establecida'));
        return;
    }
    const filter = {_id: new mongodb.ObjectID(req.params.id)};

    //Eliminar una persona
    db.get().db('apidb').collection('personas').deleteOne(filter, function(err, result){
        //Si se produjo un error, enviar dicho error a la siguiente función
        if(err){
            next (new Error('Fallo en la conexión con MongoDb'));
            return;
        }else{
            //Si todo ha ido bien, devolver el resultado al cliente
            res.send(result);
        }
    })
}