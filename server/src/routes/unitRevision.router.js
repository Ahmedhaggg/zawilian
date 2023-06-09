let router = require("express").Router({ mergeParams: true });
let unitRevisionController = require("../controllers/unitRevision.controller");
let unitRevisionValidator = require("../validations/unitRevision.validator");
let catchErrors = require("../middlewares/catchErrors");
let guards = require("../middlewares/guards");
let checkValidationErrors = require("../middlewares/checkValidationErrors");

router
    .route("/")
        .post(
            guards.guard("teacher"),
            unitRevisionValidator.validate("store"),
            checkValidationErrors,
            catchErrors(unitRevisionController.store)
        );

router
    .route("/:revisionId")
        .get(
            guards.guard("teacher", "student"),
            catchErrors(unitRevisionController.show)
        )
        .patch(
            guards.guard("teacher"),
            unitRevisionValidator.validate("update"),
            checkValidationErrors,
            catchErrors(unitRevisionController.update)
        )
        .delete(
            guards.guard("teacher"),
            catchErrors(unitRevisionController.destroy)
        );

router.get("/:revisionId/exam", 
    guards.guard("teacher", "student"),
    catchErrors(unitRevisionController.showExam)
);

module.exports = router;