const isEmpty = require('./isEmpty');
const Validator = require('validator');

module.exports = function validateUserInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email: '';
    data.password = !isEmpty(data.password) ? data.password: '';

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email must be correct';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'password field is required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = 'Password must be between 6 and 30 charachters';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
