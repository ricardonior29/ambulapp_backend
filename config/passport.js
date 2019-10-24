
// This module lets authenticate endpoints using a JSON web token. It is intended to be used to secure RESTful endpoints without sessions.
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const mongoose = require("mongoose");
const Ambulancia = mongoose.model("ambulancias");
const CentroMedico = mongoose.model("centros_medicos");
const keys = require("../config/keys");
const opts = {};

//Append the token to a Bearer string
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

// secretOrKey is a string or buffer containing the secret (symmetric) or PEM-encoded public key (asymmetric) for verifying the token's signature. 
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
  passport.use(
    // jwt_payload is an object literal containing the decoded JWT payload.
    new JwtStrategy(opts, (jwt_payload, done) => {
      Ambulancia.findById(jwt_payload.id)
        .then(ambulancia => {
          if (ambulancia) {
            return done(null, ambulancia);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
        
        // CentroMedico.findById(jwt_payload.id)
        // .then(centromedico => {
        //   if (centromedico) {
        //     return done(null, centromedico);
        //   }
        //   return done(null, false);
        // })
        // .catch(err => console.log(err));
    })
  );
};