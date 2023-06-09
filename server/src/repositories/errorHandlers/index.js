const APIError = require("../../errors/api.error")
const ErrorStatus = require("../../errors/status")

exports.catchErrorOnCreate = async error => {   
    if (error.name === "SequelizeUniqueConstraintError")
        throw new APIError(ErrorStatus.CLIENT_ERROR, {
            message: [{
                param: error.errors[0].path,
                msg: error.errors[0].message,
                location: "body"
            }]
        })
    else if (error.name === "SequelizeForeignKeyConstraintError") {
        let field = error.parent.detail.split("(")[1].split(")")[0]
        throw new APIError(ErrorStatus.CLIENT_ERROR, {
            message: [{
                param: field,
                msg: "invalid value",
                location: "body"
            }]
        })
    } else 
        throw new Error()
    
}

exports.catchIncrementError = error => {
    if (error.original.code === 'ER_DATA_OUT_OF_RANGE') 
        return {
            success: false,
            errorType: "valueIsOutOfRange"
        }
    else 
        return {
            success: false,
            errorType: "serverError"
        }
}