const Validator = require("validator"); //used to validate inputs (e.g. check for valid email format, confirming passwords match)
const isEmpty = require("is-empty"); //global function that will come in handy when we use validator

module.exports = function validateNewSolicitud(data) {

    let errors = {};
    console.log(data);
    // Convert empty fields to an empty string so we can use validator functions
    data.valoracion = !isEmpty(data.valoracion) ? data.valoracion : "";

    // description checks
    if (Validator.isEmpty(data.valoracion)) {
        errors.valoracion = "No ha ingresado una descripción de la emergencia.";
    } 
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

/*module.exports = function validateUpdateSolicitud(data) {

    /*let errors = {};
    console.log(data);
    // Convert empty fields to an empty string so we can use validator functions
    data.valoracion = !isEmpty(data.valoracion) ? data.valoracion : "";

    // description checks
    if (Validator.isEmpty(data.valoracion)) {
        errors.valoracion = "No ha ingresado una descripción de la emergencia.";
    } 
    return {
        errors,
        isValid: isEmpty(errors)
    };
};*/