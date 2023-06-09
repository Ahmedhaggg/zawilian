let router = require("express").Router({ mergeParams: true });
let unitController = require("../controllers/unit.controller");
let unitValidator = require("../validations/unit.validator");
let catchErrors = require("../middlewares/catchErrors");
let guards = require("../middlewares/guards");
let checkValidationErrors = require("../middlewares/checkValidationErrors");

router
    .route("/")
        .get(
            guards.guard("teacher", "student"),
            catchErrors(unitController.index)
        )
        .post(
            guards.guard("teacher"),
            unitValidator.validate("store"),
            checkValidationErrors,
            catchErrors(unitController.store)
        );

router
    .route("/:unitId")
        .get(
            guards.guard("teacher", "student"),
            catchErrors(unitController.show)
        )
        .patch(
            guards.guard("teacher"),
            unitValidator.validate("update"),
            checkValidationErrors,
            catchErrors(unitController.update)
        )
        .delete(
            guards.guard("teacher"),
            catchErrors(unitController.destroy)
        );

router
    .route("/:unitId/exam")
        .get(
            guards.guard("teacher", "student"),
            catchErrors(unitController.showExam)
        )
        .post(
            guards.guard("teacher"),
            unitValidator.validate("storeExam"),
            checkValidationErrors,
            catchErrors(unitController.storeExam)
        );

module.exports = router;