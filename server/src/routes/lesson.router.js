let router = require("express").Router({ mergeParams: true });
let lessonController = require("../controllers/lesson.controller");
let lessonValidator = require("../validations/lesson.validator");
let catchErrors = require("../middlewares/catchErrors");
let guards = require("../middlewares/guards");
let checkValidationErrors = require("../middlewares/checkValidationErrors");

router
    .route("/")
        .post(
            guards.guard("teacher"),
            lessonValidator.validate("store"),
            checkValidationErrors,
            catchErrors(lessonController.store)
        );

router
    .route("/:lessonId")
        .get(
            guards.guard("teacher", "student"),
            catchErrors(lessonController.show)
        )
        .patch(
            guards.guard("teacher"),
            lessonValidator.validate("update"),
            checkValidationErrors,
            catchErrors(lessonController.update)
        )
        .delete(
            guards.guard("teacher"),
            catchErrors(lessonController.destroy)
        );

router.get("/:lessonId/exam", 
    guards.guard("teacher", "student"),
    catchErrors(lessonController.showExam)
);

module.exports = router;