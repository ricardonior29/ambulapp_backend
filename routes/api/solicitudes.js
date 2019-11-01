const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Load input validation

// Load Solicitud model
const {Solicitud, Paciente} = require("../../models/Solicitud");
const validateNewSolicitud = require("../../validation/checksolicitud");

// @route POST api/solicitudes/nueva
// @desc Nueva solicitud
// @access Public
router.post("/nueva", (req, res) => {
    // Form validation
    //console.log(req.body)
    const { errors, isValid } = validateNewSolicitud(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    /*const newPaciente = new Paciente({
        edad: req.body.paciente.edad,
        condiciones: req.body.paciente.condiciones
    })*/

    const newSolicitud = new Solicitud({
        fecha_creacion: Date.now(),
        nivel_triaje: req.body.nivel_triaje,
        latitud: req.body.latitud,
        longitud: req.body.longitud,
        valoracion: req.body.valoracion,
        paciente: req.body.paciente,
        ambulancia:  mongoose.Types.ObjectId(req.body.ambulancia)
    });

    newSolicitud
        .save()
        .then(solicitud => res.json(solicitud))
        .catch(err => console.log(err));
});


// @route GET api/solicitudes/
// @desc Muestra las solicitudes activas
// @access Public
router.get("/", async (req, res) => {
    var date = new Date();
    date.setSeconds(date.getSeconds()-30);
   // date.setDate(date.getDay() - 3);
    console.log(date.toLocaleString());
    
    try {
        var result = await Solicitud.find().where('fecha_creacion').gte(date).sort({ nivel_triaje: 'asc' }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// @route GET api/solicitudes/filter
// @desc Muestra las solicitudes con base en las respuestas del centro médico
// @access Public
router.get("/filter/:idCentroMedico", async (req, res) => {  
    var date = new Date();
    date.setSeconds(date.getSeconds()-30);  
    try {
        var result = await Solicitud.find({ "centros_medicos.id": { "$ne": mongoose.Types.ObjectId(req.params.idCentroMedico)}}).where('fecha_creacion').gte(date).sort({ nivel_triaje: 'asc' });  
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// @route GET api/solicitudes/aceptadas
// @desc Muestra las solicitudes con respuesta positiva
// @access Public
router.get("/aceptadas/:idCentroMedico", async (req, res) => {  
    console.log(req)  
    try {
        var result = await Solicitud.find(
            {"centros_medicos":
                { "$elemMatch": {id: mongoose.Types.ObjectId(req.params.idCentroMedico), aceptada: "true"}, 
                  "$not": { "$elemMatch": {aceptada: "admitido"}}}});  
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// @route POST api/solicitudes/:idSolicitud/
// @desc Nueva solicitud
// @access Public
// @body: idCentroMedico, respuesta

router.post("/:idSolicitud", async (req, res) => {
    const respuesta = {"id": req.body.id, "aceptada": req.body.aceptada, "fecha_admision": req.body.fecha_admision};
    console.log(respuesta);
    
    try {
        var result = await Solicitud.findByIdAndUpdate({ _id: req.params.idSolicitud }, {$push: {centros_medicos: respuesta}}).exec();
        res.send(result);
        //console.log(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

// @route GET api/solicitudes/:idSolicitud/
// @access Public

router.get("/:idSolicitud", async (req, res) => {
    
    try {
        var result = await Solicitud.findById(req.params.idSolicitud).exec();
        res.send(result);
        //console.log(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;