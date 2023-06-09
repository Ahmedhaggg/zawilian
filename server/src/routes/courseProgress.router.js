let router = require("express").Router({ mergeParams: true });
let courseProgressController = require("../controllers/courseProgress.controller");
let courseProgressValidator = require("../validations/courseProgress.validator");
let catchErrors = require("../middlewares/catchErrors");
let guards = require("../middlewares/guards");
const checkValidationErrors = require("../middlewares/checkValidationErrors");

router
    .route("/")
        .patch(
            guards.guard("student"),
            courseProgressValidator.validate("update"),
            checkValidationErrors,
            catchErrors(courseProgressController.update)
        )
        .get(
            guards.guard("student"),
            catchErrors(courseProgressController.show)
        );

module.exports = router;