const Validator = require("validator"); //used to validate inputs (e.g. check for valid email format, confirming passwords match)
const isEmpty = require("is-empty"); //global function that will come in handy when we use validator

module.exports = function validateLoginInput(data) {

    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "No ha ingresado el correo electrónico";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Dirección de correo invalida";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "No ha ingresado la contraseña";
    } return {
        errors,
        isValid: isEmpty(errors)
    };
};