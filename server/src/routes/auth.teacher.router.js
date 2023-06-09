let router = require("express").Router();
let authTeacherController = require("../controllers/auth.teacher.controller");
let authTeacherValidator = require("../validations/auth.teacher.validator");
let catchErrors = require("../middlewares/catchErrors");
let checkValidationErrors = require("../middlewares/checkValidationErrors");

router.post("/login",
    authTeacherValidator.validate("login"),
    checkValidationErrors,
    catchErrors(authTeacherController.login)
);

module.exports = router;