const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Load input validation
const validateRegisterInputMedico = require("../../validation/register").validateRegisterInputMedico;

// Load CentroMedico model
var CentroMedico = require('../../models/CentroMedico');

// @route POST api/centrosmedicos/register
// @desc Register centromedico
// @access Public
router.post("/register", (req, res) => {

    // Form validation
    const { errors, isValid } = validateRegisterInputMedico(req.body); 

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    //If valid input, use MongoDB’s CentroMedico.findOne() to see if the centromedico exists

    CentroMedico.findOne({ email: req.body.email }).then(centromedico => {
        if (centromedico) {
            return res.status(400).json({ email: "El correo electrónico ya existe" });
        } else {
            const newCentroMedico = new CentroMedico({
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                latitud: req.body.latitud,
                longitud: req.body.longitud,
                email: req.body.email,
                password: req.body.password
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newCentroMedico.password, salt, (err, hash) => {
                    if (err) throw err;
                    newCentroMedico.password = hash;
                    newCentroMedico
                        .save()
                        .then(centromedico => res.json(centromedico))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route GET api/centrosmedicos/
// @desc Muestra los centros medicos
// @access Public
router.get("/", async (req, res) => {    
    try {
        var result = await CentroMedico.find().exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// router.get("/", (req, res) => { //muestra todos los pacientes en la bd
//     CentroMedico.mostrarCentrosmedicos(function(err, cm) {
//         if (err)
//             res.send(err);
//             //console.log('res ', solicitud);
//             res.send(cm);
//       });
// });

// router.get("/:id", (req, res) => { //consulta el paciente por documento de identidad
//     CentroMedico.mostrarCentromedicoporId(req.params.id, function(err, cm) {
//         if (err)
//             res.send(err);
//         //console.log(cm.RowDataPacket);
//         res.send(cm[0][0]);
//       });
// });

module.exports = router;