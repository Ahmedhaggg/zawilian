let messages = require("../helpers/messages");
let { check } = require("express-validator");

let mainRules = [
    check("name")
        .notEmpty()
        .withMessage(messages.genrale.required),
    check("currentCourseId")
        .optional()
        .notEmpty()
        .withMessage(messages.genrale.required)
        .isNumeric()
        .withMessage(messages.genrale.isNumber)
];

module.exports = {
    validate: action => {
        switch (action) {
            case "store":
                return mainRules
            case "update":
                return mainRules
        }
    }
}