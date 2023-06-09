let { validationResult } = require("express-validator");
const APIError = require("../errors/api.error");
let status = require("../errors/status");

module.exports = (req, res, next) => {
    let result = validationResult(req).array();

    if (result.length == 0)
        return next();

    let errors = {};
    result.forEach(error => { errors[error.param] = error.msg });

    let newError = new APIError(status.CLIENT_ERROR, {
        success: false,
        errorName: "validationError",
        errors
    });

    next(newError);
}