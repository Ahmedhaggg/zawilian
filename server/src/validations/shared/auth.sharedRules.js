let messages = require("../../helpers/messages");
let { check } = require("express-validator");

exports.login = [
    check("email")
        .notEmpty().withMessage(messages.genrale.required)
        .isEmail().withMessage(messages.genrale.isEmail),
    check("password")
        .notEmpty()
        .withMessage(messages.genrale.required)
]