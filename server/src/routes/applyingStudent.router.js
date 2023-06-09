let router = require("express").Router({ mergeParams: true });
let applyingStudentController = require("../controllers/applyingStudent.controller");
let applyingStudentValidator = require("../validations/applyingStudent.validator");
let catchErrors = require("../middlewares/catchErrors");
let guards = require("../middlewares/guards");
let checkValidationErrors = require("../middlewares/checkValidationErrors")
router
    .get("/count", 
        guards.guard("teacher"),
        catchErrors(applyingStudentController.count)
    );

router
    .get("/", 
        guards.guard("teacher"),
        catchErrors(applyingStudentController.index)
    );

router
    .get("/result/:email",
        catchErrors(applyingStudentController.getAcceptedResult)
    )

router
    .route("/:studentId")
        .get(
            guards.guard("teacher"),
            catchErrors(applyingStudentController.show)
        )
        .patch(
            guards.guard("teacher"),
            applyingStudentValidator.validate("accept"),
            checkValidationErrors,
            catchErrors(applyingStudentController.accept)
        )
        .delete(
            guards.guard("teacher"),
            catchErrors(applyingStudentController.destroy)
        )

module.exports = router;