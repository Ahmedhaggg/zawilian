let messages = require("../../helpers/messages");
let { check } = require("express-validator");

exports.store = [
    check("name").notEmpty().withMessage(messages.genrale.required),
    check("video").notEmpty().withMessage(messages.genrale.required),
    check("description").notEmpty().withMessage(messages.genrale.required),
    check("exam").notEmpty().withMessage(messages.genrale.required),
    check("exam.points").notEmpty().withMessage(messages.genrale.required),
    check("exam.questions").not().isEmpty().withMessage(messages.genrale.required),
    check("exam.questions[*]question").not().isEmpty().withMessage(messages.genrale.required),
    check("exam.questions[*]answers").not().isEmpty().withMessage(messages.genrale.required),
    check("exam.questions[*]correctAnswer").not().isEmpty().withMessage(messages.genrale.required)
]

exports.update = [
    check("name").notEmpty().withMessage(messages.genrale.required),
    check("video").notEmpty().withMessage(messages.genrale.required),
    check("description").notEmpty().withMessage(messages.genrale.required),
]