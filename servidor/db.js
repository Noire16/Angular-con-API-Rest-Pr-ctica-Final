//Crear cliente de MongoDb
var MongoClient= require('mongodb').MongoClient;

//Variable para almacenar la conexión
var db = null;

//Conectar con la base de datos
module.exports.connect = function (url,callback){
    //Si ya estuviese conectado, no se volvería a conectar
    if(db){
        return callback();
    }

    //Crear una instancia del cliente de MongoDb
    const client = new MongoClient(url, {useNewUrlParser: true});

    //Conectar el cliente al servidor
    client.connect(function (err, result) {
        if (err){
            return callback (err);
        }
        db = result;
        callback();
    });
}

//Función para cerrar conexión con la base de datos
module.exports.close= function (callback){
    if(db){
        db.close(function (err,result){
            console.log("Desconectado de MongoDb");
            db = null;
            callback(err);
        })
    }
}

// Función para obtener el cliente de MongoDB conectado a la DB
module.exports.get = function () {
    return db;
}