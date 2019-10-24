const express = require("express");
const router = express.Router();

var Paciente = require('../../models/Paciente.js');

router.get("/", (req, res) => { //muestra todos los pacientes en la bd
    Paciente.mostrarPacientes(function(err, paciente) {
        if (err)
            res.send(err);
            //console.log('res ', solicitud);
            res.send(paciente);
      });
});

router.get("/:id", (req, res) => { //consulta el paciente por documento de identidad
    Paciente.mostrarPacienteporDocumento(req.params.id, function(err, paciente) {
        if (err)
            res.send(err);
        //console.log(paciente.RowDataPacket);
        res.send(paciente[0][0]);
      });
});

module.exports = router;