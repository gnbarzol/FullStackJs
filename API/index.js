const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes'); 
const bodyParser = require('body-parser');
const cors = require('cors');

//crear el servidor
const app = express();

//Habilitar cors

//app.use(cors()); cualquiera puede acceder a la api

//Limitar el uso de la api a una ip en especifico
const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: (origin,callback) =>{
        //console.log(origin);
        const existe = whitelist.some( dominio => dominio===origin);
        if(existe)
            callback(null, true);
        else
            callback(new Error('No permitido por cors'))
    }
}

//app.use(cors(corsOptions));
app.use(cors());


//conectar a mongoDB
 mongoose.Promise = global.Promise;
 //Si lo tengo en local la db la direccion sera la de abajo
 mongoose.connect('mongodb://localhost/veterinaria',{
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false
 })

//Habilitar el body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Habilitar routing
app.use('/', routes()); //Cuando alguien visite mi sitio web se va a ejecutar la funcion routes

//puerto y correr servidor
app.listen(4000,() => {
    console.log("Servidor funcionando");
})
