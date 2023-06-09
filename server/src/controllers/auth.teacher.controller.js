let status = require("../errors/status");
const APIError = require("../errors/api.error");
let messages = require("../helpers/messages");
let roles = require("../helpers/roles");
let jwt = require("../helpers/jwt");
const { ADMIN_EMAIL, ADMIN_PASSWORD } = require("../config");

exports.login = async (req, res, next) => {
    let { email, password } = req.body;

    if (ADMIN_EMAIL !== email || ADMIN_PASSWORD !== password) 
        throw new APIError(
            status.NOT_FOUND,
            {
                message: messages.login.faild.password
            }
        );

    let token = await jwt.createJwtToken({
        role: "teacher"
    }, "30d");

    res.status(status.OK).json({
        success: true,
        token,
        message: messages.login.success
    });
}