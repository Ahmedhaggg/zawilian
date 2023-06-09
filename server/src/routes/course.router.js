let router = require("express").Router();
let courseController = require("../controllers/course.controller");
let courseValidator = require("../validations/course.validator");
let catchErrors = require("../middlewares/catchErrors");
let guards = require("../middlewares/guards");
let checkValidationErrors = require("../middlewares/checkValidationErrors");
router
    .route("/:courseId")
        .get(
            guards.guard("student", "teacher"),
            catchErrors(courseController.show)
        )
        .patch(
            guards.guard("teacher"),
            courseValidator.validate("update"),
            checkValidationErrors,
            catchErrors(courseController.update)
        );

router
    .route("/")
        .get(
            guards.guard("teacher"), 
            catchErrors(courseController.index)
        )
        .post(
            guards.guard("teacher"),
            courseValidator.validate("store"),
            checkValidationErrors, 
            catchErrors(courseController.store)
        )


module.exports = router;
