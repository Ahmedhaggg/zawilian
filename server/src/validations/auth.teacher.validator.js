const authRules = require("./shared/auth.sharedRules");
module.exports = {
    validate: action => {
        switch (action) {
            case "login":
                return authRules.login
        }
    }
}