const sectionMainRules = require("./shared/section.sharedRules")
module.exports = {
    validate: action => {
        switch (action) {
            case "store":
                return sectionMainRules.store
            case "update":
                return sectionMainRules.update
        }
    }
}