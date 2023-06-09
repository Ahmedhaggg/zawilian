let router = require("express").Router();
let authStudentController = require("../controllers/auth.student.controller");
let authStudentValidator = require("../validations/auth.student.validator");
let catchErrors = require("../middlewares/catchErrors");
const checkValidationErrors = require("../middlewares/checkValidationErrors");

router.post("/login",
    authStudentValidator.validate('login'),
    checkValidationErrors,
    catchErrors(authStudentController.login)
);

router.post("/register",
    authStudentValidator.validate('register'),
    checkValidationErrors,
    catchErrors(authStudentController.register)
);

module.exports = router;