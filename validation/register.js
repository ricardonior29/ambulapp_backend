const Validator = require("validator"); //used to validate inputs (e.g. check for valid email format, confirming passwords match)
const isEmpty = require("is-empty"); //global function that will come in handy when we use validator

module.exports = {
  validateRegisterInputAmbulancia, 
  validateRegisterInputMedico,
};

function validateRegisterInputAmbulancia(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.placa = !isEmpty(data.placa) ? data.placa : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Placa checks
  if (Validator.isEmpty(data.placa)) {
    errors.placa = "No ha ingresado la placa del vehículo";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "No ha ingresado el correo electrónico";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Dirección de correo invalida";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "No ha ingresado la contraseña";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Vuelva a ingresar la contraseña";
  }
  if (!Validator.isLength(data.password, { min: 5, max: 30 })) {
    errors.password = "La contraseña debe contener mínimo 5 caracteres";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Las contraseñas no coinciden";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

function validateRegisterInputMedico(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.nombre = !isEmpty(data.nombre) ? data.nombre : "";
  data.direccion = !isEmpty(data.direccion) ? data.direccion : "";
  data.latitud = !isEmpty(data.latitud) ? data.latitud : "";
  data.longitud = !isEmpty(data.longitud) ? data.longitud : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Nombre checks
  if (Validator.isEmpty(data.nombre)) {
    errors.nombre = "No ha ingresado el nombre del centro médico";
  }
  // Direccion checks
  if (Validator.isEmpty(data.direccion)) {
    errors.direccion = "No ha ingresado la dirección del centro médico";
  }
  // Latitud checks
  if (Validator.isEmpty(data.latitud) || !Validator.isDecimal(data.latitud)) {
    errors.latitud = "Latitud no valida";
  }
  // Longitud checks
  if (Validator.isEmpty(data.longitud) || !Validator.isDecimal(data.longitud)) {
    errors.longitud = "Longitud no valida";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "No ha ingresado el correo electrónico";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Dirección de correo invalida";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "No ha ingresado la contraseña";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Vuelva a ingresar la contraseña";
  }
  if (!Validator.isLength(data.password, { min: 5, max: 30 })) {
    errors.password = "La contraseña debe contener mínimo 5 caracteres";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Las contraseñas no coinciden";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
