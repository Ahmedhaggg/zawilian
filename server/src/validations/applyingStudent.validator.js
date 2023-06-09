let messages = require("../helpers/messages");
let { check, param } = require("express-validator");

module.exports = {
    validate: action => {
        switch (action) {
            case "accept":
                return [
                    check("startUnitArrangement")
                        .notEmpty().withMessage(messages.genrale.required)
                        .isNumeric().withMessage(messages.genrale.isNumber),
                    check("startSectionArrangement")
                        .notEmpty().withMessage(messages.genrale.required)
                        .isNumeric().withMessage(messages.genrale.isNumber)
                ]; 
        }
    }
}