let router = require("express").Router({ mergeParams: true });
let studentController = require("../controllers/examScore.controller");
let studentValidator = require("../validations/examScore.validator");
let catchErrors = require("../middlewares/catchErrors");
let guards = require("../middlewares/guards");
let checkValidationErrors = require("../middlewares/checkValidationErrors"); 

router.post("/", 
    guards.guard("student"),
    studentValidator.validate("store"),
    checkValidationErrors,
    catchErrors(studentController.store)
);

router.get("/exam", 
    guards.guard("teacher"),
    catchErrors(studentController.showStudentsScoresInExam)
);

router.get("/students/:studentId?", 
    guards.guard("teacher", "student"),
    catchErrors(studentController.showStudentScore)
);

module.exports = router;