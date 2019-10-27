const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create a Schema to represent an, defining fields and types as objects of the Schema
var ObjectId = mongoose.Schema.Types.ObjectId;
const RespuestaSchema = new Schema({
    id: {
        type: ObjectId,
        required: true,
    },
    aceptada: {
        type: Boolean,
        default: false
    }
});
/*const PacienteSchema = new Schema({
    edad: {
        type: Number
    },
    condiciones: [{
        type: String
    }]
})*/


const SolicitudSchema = new Schema({
  fecha_creacion: {
    type: Date,
    required: true,
    //default: Date.now,
  },
  nivel_triaje: {
    type: Number,
    required: true,
  },
  latitud: {
    type: Number,
    required: true,
  },
  longitud: {
    type: Number,
    required: true,
  },
  valoracion: {
    type: String,
    required: true,
  },
  paciente: {
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    documento: {
        type: Number
    },
    edad: {
        type: Number
    },
    tipo_sangre: {
        type: String
    },
    condiciones: [{
        type: String
    }]
},
  ambulancia: {
    type: ObjectId,
    required: true,
  },
  centros_medicos: [RespuestaSchema]
});

/*
var sql = require('../db.js');

//constructor
var solicitud = function(solicitud){
    this.ID_solicitud = solicitud.ID_solicitud;
    this.Fecha_creacion = solicitud.Fecha_creacion;
    this.Fecha_admision = solicitud.Fecha_admision;
    this.Latitud = solicitud.Latitud;
    this.Longitud = solicitud.Longitud;
    this.Nivel_triaje = solicitud.Nivel_triaje;
    this.Valoracion = solicitud.Valoracion;
    this.Ambulancia = solicitud.Ambulancia; //revisar si objeto ambulancia
}

solicitud.mostrarSolicitudes = function(resultado) {
    sql.query("SELECT * FROM Solicitudes", function (err, res) {

        if(err) {
            console.log("error: ", err);
            resultado(null, err);
        }
        else{
            //console.log('solicitudes : ', res);  
            resultado(null, res);
        }
    });
};

solicitud.mostrarSolicitudesActivas = function(resultado) { //solicitudes de menos de un minuto de creacion
    sql.query("CALL pro_mostrarsolicitudes()", function (err, res) {

        if(err) {
            console.log("error: ", err);
            resultado(null, err);
        }
        else{
            //console.log('solicitudes activas : ', res);  
            resultado(null, res);
        }
    });
};

solicitud.mostrarSolicitudporId = function(id, resultado) {
    sql.query("CALL pro_getSolicitudbyId(?)", id, function (err, res) {

        if(err) {
            console.log("error: ", err);
            resultado(null, err);
        }
        else{
            //console.log('solicitud : ', res);  
            resultado(null, res);
        }
    });
};
*/

Solicitud = mongoose.model("solicitudes", SolicitudSchema);
Respuesta = mongoose.model("respuestas", RespuestaSchema);
//Paciente = mongoose.model("pacientes", PacienteSchema);
module.exports =  {Solicitud, Respuesta};//, Paciente}; 

