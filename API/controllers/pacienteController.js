const Paciente = require('../models/Paciente');


//Cuando se crea un nuevo cliente
exports.nuevoCliente = async ( req, res, next) =>{ //Lo que hace next es que me pase a la siguiente funcion

    //Creamos un paciente con los datos del request
    const paciente = new Paciente(req.body);

    //Todo: insertar en la db
    try {
        await paciente.save();
        res.json({ mensaje: 'El cliente se agrego correctamente'});
    } catch (error) {
        console.log(error); //Lo mas probable es que se quede aqui
        next(); // y por eso el next para que pasa a la siguiente funcion
    }
}

//Obtiene todos los pacientes
exports.obtenerPacientes = async (req, res, next) =>{

    try {
        const pacientes = await Paciente.find({}); //Nos va a traer todos los datos de la tabla paciente
        res.json(pacientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Obtiene un paciente en especifico por su id
exports.obtenerPaciente = async (req, res, next) =>{
    try {
        const paciente = await Paciente.findById(req.params.id); 
        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Actualiza un registro por id
exports.actualizarPaciente = async (req, res, next) =>{
    try {
        const paciente = await Paciente.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true
        }); //Me va actualizar el paciente con ese id, me lo va a actualizar con lo que reciba de nuevo, y el true es para que me retorne el paciente actualizado
        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }
}


//Eliminar un paciente por id
exports.eliminarPaciente = async (req, res, next) =>{
    try {
        await Paciente.findOneAndDelete({_id: req.params.id});
        res.json({mensaje: 'El paciente fue eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}