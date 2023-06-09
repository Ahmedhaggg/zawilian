let messages = require("../helpers/messages");
let { check } = require("express-validator");
const authRules = require("./shared/auth.sharedRules");

module.exports = {
    validate: action => {
        switch (action) {
            case "register":
                return [
                    check("name")
                        .notEmpty().withMessage(messages.genrale.required)
                        .custom((value, _) => {
                            let arrayOfName = value.split(" ");
                                
                            if (arrayOfName.length !== 4 )
                                throw new Error(messages.genrale.isQuadrantName)
                            return true;
                                        
                        }),
                    check("email")
                        .notEmpty().withMessage(messages.genrale.required)
                        .isEmail().withMessage(messages.genrale.isEmail),
                    check("password")
                        .notEmpty()
                        .withMessage(messages.genrale.required)
                        .isLength({ min: 8 })
                        .withMessage(messages.genrale.minLength(8))
                        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,)
                        .withMessage(messages.genrale.isStrongPassword),
                    check("confirmPassword")
                        .notEmpty()
                        .withMessage(messages.genrale.required)
                        .custom((_, { req }) => {
                            if (req.body.password !== req.body.confirmPassword) 
                                throw new Error(messages.genrale.isConfirmPassword)
                            return true;
                        }),
                    check("phoneNumber")
                        .notEmpty()
                        .withMessage(messages.genrale.required)
                        .isMobilePhone("ar-EG")
                        .withMessage(messages.genrale.isPhoneNumber),
                    check("gradeId")
                        .notEmpty()
                        .withMessage(messages.genrale.required)
                        .isNumeric()
                        .withMessage(messages.genrale.isNumber)
                    
                ];
            case "login":
                return authRules.login
        }
    }
}