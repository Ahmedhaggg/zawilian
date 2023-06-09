let status = require("./status");
let APIError = require("./api.error");
let messages = require("../helpers/messages");

exports.handleInsertErrors = error => {
    if (error.name === "ValidationError") {
        let errors = {};

        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].kind === "ObjectId" ? messages.genrale.incorrectId : error.errors[key].message;
        });

        throw new APIError(status.CLIENT_ERROR, {
            errorName: "validationError",
            errors
        });
    }

    if (error.index === 0) {
        let errors = {};
        Object.keys(error.keyPattern).forEach(key => {
            errors[key] = messages.genrale.unique
        });
        throw new APIError(status.CLIENT_ERROR, {
            message: errors
        });
    }

    throw new APIError(status.INTERNAL_SERVER_ERROR, {
        message: messages.serverError
    });

};

exports.handleUpdateErrors = error => {
    throw error.matchedCount === 0 ? new APIError(status.NOT_FOUND, {
        errorName: "updateError",
        message: messages.notFound
    }) : new APIError(status.CLIENT_ERROR, {
        errorName: "updateError",
        message: messages.oldData
    })


}