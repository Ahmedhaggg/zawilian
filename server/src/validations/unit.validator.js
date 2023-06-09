let messages = require("../helpers/messages");
let { check } = require("express-validator");

let mainRules = [
    check("name").notEmpty().withMessage(messages.genrale.required),
    check("description").notEmpty().withMessage(messages.genrale.required)
]

module.exports = {
    validate: action => {
        switch (action) {
            case "store":
                return mainRules
            case "update":
                return mainRules
            case "storeExam":
                return [
                    check("points").notEmpty().withMessage(messages.genrale.required),
                    check("questions").not().isEmpty().withMessage(messages.genrale.required),
                    check("questions[*]question").not().isEmpty().withMessage(messages.genrale.required),
                    check("questions[*]answers").not().isEmpty().withMessage(messages.genrale.required),
                    check("questions[*]correctAnswer").not().isEmpty().withMessage(messages.genrale.required)
                ];
        }
    }
}