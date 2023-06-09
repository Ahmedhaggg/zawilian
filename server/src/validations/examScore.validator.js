let messages = require("../helpers/messages");
let { check } = require("express-validator");

module.exports = {
    validate: action => {
        switch (action) {
            case "store":
                return [
                    check("score").notEmpty().withMessage(messages.genrale.required)
                        .isInt().withMessage(messages.genrale.isNumber),
                    check("examId").notEmpty().withMessage(messages.genrale.required)
                        .isInt().withMessage(messages.genrale.isNumber),
                    check("relatedId")
                        .custom((_, { req }) => {
                            const fields = ['courseRevisionId', 'sectionId', 'unitId'];
                            const providedFields = fields.filter((field) => req.body[field]);

                            if (providedFields.length !== 1) 
                                throw new Error(messages.genrale.isRequiredRelatedId)
                            return true;
                        })
                ]
        }
    }
}