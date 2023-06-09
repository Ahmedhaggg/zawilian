let studentRepository = require("../repositories/student.repository");
let messages = require("../helpers/messages");
let status = require("../errors/status");
const APIError = require("../errors/api.error");
const { compare } = require("../helpers/hash");
let jwt = require("../helpers/jwt");
const roles = require("../helpers/roles");
 
exports.register = async (req, res, next) => {
    let { name, email, password, phoneNumber, gradeId, courseId } = req.body;

    await studentRepository.create({
        name,
        email,
        password,
        phoneNumber,
        gradeId,
        courseId
    });

    res.status(status.OK).json({
        success: true,
        message: messages.register.success
    });

};

exports.login = async (req, res, next) => {
    let { email, password } = req.body;

    let student = await studentRepository.findLoginDataByEmail(email);
    if (!student)
        throw new APIError(status.CLIENT_ERROR, {
            message: messages.login.faild.email
        });

    if (student.accepted === false)
        throw new APIError(status.UNAUTHENTICATED, {
            message: messages.login.faild.unaccepted
        });

    let checkPassword = await compare(password, student.password);

    if (checkPassword === false)
        throw new APIError(status.CLIENT_ERROR, {
            message: messages.login.faild.password
        });


    let token = await jwt.createJwtToken({
        id: student.id,
        role: roles.STUDENT,
        courseId: student.courseId
    }, "30d");

    res.status(status.OK).json({
        success: true,
        token,
        message: messages.login.success
    });

}
