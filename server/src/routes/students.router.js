let router = require("express").Router({ mergeParams: true });
let studentController = require("../controllers/student.controller");
let catchErrors = require("../middlewares/catchErrors");
let guards = require("../middlewares/guards");

router.get("/", 
    guards.guard("teacher"),
    catchErrors(studentController.index)
);

router.get("/count", 
    guards.guard("teacher"),
    catchErrors(studentController.count)
);

router.get("/profile", 
    guards.guard("student"),
    catchErrors(studentController.show)
);


router.get("/:studentId", 
    guards.guard("teacher"),
    catchErrors(studentController.show)
);

module.exports = router;