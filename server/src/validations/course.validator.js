let messages = require("../helpers/messages");
let { check } = require("express-validator");

const mainRules = [
    check("name").notEmpty().withMessage(messages.genrale.required),
    check("gradeId")
        .optional()
        .isNumeric()
        .withMessage(messages.genrale.isNumber)
];

module.exports = {
    validate: action => {
        switch (action) {
            case "store":
                return [
                    ...mainRules,
                    check("term")
                    .notEmpty().withMessage(messages.genrale.required)
                    .isIn(["first", "second"])
                ];
            case "update":
                return mainRules;
        }
    }
}