let jwt = require("jsonwebtoken");
let { JWT_SECRET } = require("../config/index");
const APIError = require("../errors/api.error");

exports.createJwtToken = async (data, expire) => {
    try {
        let token = await jwt.sign(data, JWT_SECRET, { expiresIn: expire });
        return token;
    } catch (_) {
        throw new Error("something went wrong")
    }
};
exports.getDataFromJwtToken = async (token) => {
    try {
        let data = await jwt.verify(token, JWT_SECRET);

        return data;
    } catch (r) {
        throw new APIError(401, {
            message: "not authorized",
            errorName: "authorization"
        })
    }
}