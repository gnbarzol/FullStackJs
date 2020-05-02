const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

//Porque lo vamos a exportar
module.exports = function() {

    //Agrega nuevos pacientes via POST (Se hace con post cuando quiero enviar datos)
    router.post('/pacientes', 
        pacienteController.nuevoCliente
    ) //Se epecifica la url y el controlador que va a manejar esa post

    //Obtiene todos los registros de pacientes en la db
    router.get('/pacientes',
        pacienteController.obtenerPacientes
    )

    //Obtiene un paciente en especifico por id
    router.get('/pacientes/:id', //Pal poner :id significa que se va a llamar cuando se le pase cualquier id paciente/1, paciente/1000
        pacienteController.obtenerPaciente
    )

    //Actualizar un registro por id
    router.put('/pacientes/:id',
        pacienteController.actualizarPaciente
    )

    //Eliminar un paciente por id
    router.delete('/pacientes/:id',
        pacienteController.eliminarPaciente
    )

    return router;
}

