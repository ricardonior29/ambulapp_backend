const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Load input validation
const validateRegisterInputAmbulancia = require("../../validation/register").validateRegisterInputAmbulancia;

// Load Ambulancia model
const Ambulancia = require("../../models/Ambulancia");


// @route POST api/ambulancias/register
// @desc Register ambulancia
// @access Public
router.post("/register", (req, res) => {

    // Form validation
    const { errors, isValid } = validateRegisterInputAmbulancia(req.body); 

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    //If valid input, use MongoDB’s Ambulancia.findOne() to see if the ambulance exists

    Ambulancia.findOne({ email: req.body.email }).then(ambulancia => {
        if (ambulancia) {
            return res.status(400).json({ email: "El correo electrónico ya existe" });
        } else {
            const newAmbulancia = new Ambulancia({
                placa: req.body.placa,
                email: req.body.email,
                password: req.body.password
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newAmbulancia.password, salt, (err, hash) => {
                    if (err) throw err;
                    newAmbulancia.password = hash;
                    newAmbulancia
                        .save()
                        .then(ambulancia => res.json(ambulancia))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

module.exports = router;