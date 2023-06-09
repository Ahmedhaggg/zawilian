let router = require("express").Router();
let gradeController = require("../controllers/grade.controller");
let gradeValidator = require("../validations/grade.validator");
let catchErrors = require("../middlewares/catchErrors");
let guards = require("../middlewares/guards");
let checkValidationErrors = require("../middlewares/checkValidationErrors");

router
    .route("/:gradeId")
        .get(
            guards.guard("teacher"),
            catchErrors(gradeController.show)
        )
        .patch(
            guards.guard("teacher"),
            gradeValidator.validate("update"),
            checkValidationErrors,
            catchErrors(gradeController.update)
        );

router
    .route("/")
        .get(
            catchErrors(gradeController.index)
        )
        .post(
            guards.guard("teacher"),
            gradeValidator.validate("store"),
            checkValidationErrors, 
            catchErrors(gradeController.store)
        );

module.exports = router;
