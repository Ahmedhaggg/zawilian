const BaseError = require("./base.error");

class APIError extends BaseError {
    constructor(httpStatusCode, description) {
        super(httpStatusCode, description)
    }
}

module.exports = APIError