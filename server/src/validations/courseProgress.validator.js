let messages = require("../helpers/messages");
let { check } = require("express-validator");

module.exports = {
    validate: action => {
        switch (action) {
            case "update":
                return [
                    check("unitArrangement")
                        .notEmpty().withMessage(messages.genrale.required)
                        .isNumeric().withMessage(messages.genrale.isNumber),
                    check("sectionArrangement")
                        .notEmpty().withMessage(messages.genrale.required)
                        .isNumeric().withMessage(messages.genrale.isNumber)
                ];
        }
    }
}