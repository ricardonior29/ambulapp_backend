const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create a Schema to represent an Ambulance, defining fields and types as objects of the Schema
const AmbulanciaSchema = new Schema({
  placa: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Export the model so we can access it outside of this file
module.exports = Ambulancia = mongoose.model("ambulancias", AmbulanciaSchema);
