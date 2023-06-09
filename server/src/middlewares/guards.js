let APIError = require("../errors/api.error");
let messages = require("../helpers/messages");
let status = require("../errors/status");
let jwt = require("../helpers/jwt");
const catchErrors = require("./catchErrors");

exports.guard = (...roles) => catchErrors(async (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (!token) 
            throw new APIError(status.UNAUTHORIZED, {
                message: messages.unauthorized
            });


        let tokenData = await jwt.getDataFromJwtToken(token);
        
        if (!roles.includes(tokenData.role)) 
            throw new APIError(status.UNAUTHORIZED, {
                message: messages.unauthorized
            });

        req[tokenData.role] = tokenData;

        next();
    } catch (err) {
        throw new APIError(
            status.UNAUTHORIZED, 
            { message: messages.unauthorized}
        )
    }   
})
