let courseRevisionRepository = require("../repositories/courseRevision.repository")
let messages = require("../helpers/messages");
let status = require("../errors/status");
const APIError = require("../errors/api.error");

exports.show = async (req, res, next) => {
    let { revisionId } = req.params;

    let revision = await courseRevisionRepository.findById(revisionId);

    if (!revision)
        throw new APIError(status.NOT_FOUND, {
            message: messages.notFound,
            revision
        });

    res.status(status.OK).json({
        success: true,
        revision
    })
}

exports.store = async (req, res, next) => {
    let { courseId } = req.params;
    let { name, video, exam, description } = req.body;

    let newRevision = await courseRevisionRepository.create({
        name,
        video,
        exam,
        description,
        courseId
    });

    res.status(status.OK).json({
        success: true,
        message: messages.revision.success.create,
        newRevision
    });
}

exports.update = async (req, res, next) => {
    let { revisionId } = req.params;
    let { name, video, description } = req.body;

    await courseRevisionRepository.updateById(revisionId, {
        name,
        video,
        description
    });

    res.status(status.OK).json({
        success: true,
        message: messages.revision.success.update
    });
}

exports.destroy = async (req, res, next) => {
    let { revisionId } = req.params;

    let deletedRevision = await courseRevisionRepository.deleteById(revisionId);

    if (deletedRevision === false)
        throw new APIError(status.CLIENT_ERROR, {
            success: false,
            message: messages.revision.faild.delete
        });


    res.status(status.OK).json({
        success: true,
        message: messages.revision.success.delete
    });
}


exports.showExam = async (req, res, next) => {
    let { revisionId } = req.params;

    let unitExam = await courseRevisionRepository.findExamByRevisionId(revisionId);

    if (!unitExam)
        throw new APIError(status.NOT_FOUND, {
            message: messages.notFound,
            unitExam
        });

    res.status(status.OK).json({
        success: true,
        exam: unitExam
    })
}








// exports.index = async (req, res, next) => {
//     let { courseId } = req.params;

//     let revisions = await courseRevisionRepository.findByC(courseId);

//     if (!revisions && revisions.revisions.length === 0)
//         throw new APIError(status.NOT_FOUND, {
//             message: messages.notFound,
//             revisions: null
//         });

//     res.status(status.OK).json({
//         success: true,
//         revisions: revisions
//     })
// }