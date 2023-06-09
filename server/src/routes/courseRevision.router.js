let router = require("express").Router({ mergeParams: true });
let courseRevisionController = require("../controllers/courseRevision.controller");
let courseRevisionValidator = require("../validations/courseRevision.validator");
let catchErrors = require("../middlewares/catchErrors");
let guards = require("../middlewares/guards");
let checkValidationErrors = require("../middlewares/checkValidationErrors");

router
    .route("/")
        .post(
            guards.guard("teacher"),
            courseRevisionValidator.validate("store"),
            checkValidationErrors,
            catchErrors(courseRevisionController.store)
        );

router
    .route("/:revisionId")
        .get(
            guards.guard("teacher", "student"),
            catchErrors(courseRevisionController.show)
        )
        .patch(
            guards.guard("teacher"),
            courseRevisionValidator.validate("update"),
            checkValidationErrors,
            catchErrors(courseRevisionController.update)
        )
        .delete(
            guards.guard("teacher"),
            catchErrors(courseRevisionController.destroy)
        );

router.get("/:revisionId/exam", 
    guards.guard("teacher", "student"),
    catchErrors(courseRevisionController.showExam)
);

module.exports = router;