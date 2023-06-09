class BaseError extends Error {
    constructor(httpStatusCode, description) {
        super(description);
        this.httpStatusCode = httpStatusCode;
        this.description = description;
    }
}

module.exports = BaseError