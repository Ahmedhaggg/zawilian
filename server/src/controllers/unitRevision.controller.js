let revisionRepository = require("../repositories/unitRevision.repository");
let messages = require("../helpers/messages");
let status = require("../errors/status");
const APIError = require("../errors/api.error");

// exports.index = async (req, res, next) => {
//     let { unitId } = req.params;

//     let unitRevisions = await revisionRepository.findAllByUnitId(unitId);

//     if (!unitRevisions)
//         throw new APIError(status.NOT_FOUND, {
//             success: false,
//             message: messages.notFound,
//             unitRevisions
//         })

//     res.status(status.OK).json({
//         success: true,
//         unitRevisions
//     })
// }

exports.store = async (req, res, next) => {
    let { unitId } = req.params;
    let { name, video, description, exam : { points, questions } } = req.body;

    let newRevision = await revisionRepository.create(
        {
            name,
            video,
            exam: {
                points, questions
            },
            description,
            unitId
        }
    );

    res.status(status.OK).json({
        success: true,
        message: messages.revision.success.create,
        newRevision
    });
}

exports.show = async (req, res, next) => {
    let { revisionId } = req.params;

    let revision = await revisionRepository.findById(revisionId);

    if (!revision)
        throw new APIError(
            status.NOT_FOUND,
            {
                message: messages.notFound
            }
        )

    res.status(status.OK).json({
        success: true,
        revision
    });
}

exports.update = async (req, res, next) => {
    let { revisionId } = req.params;
    let { name, video, description } = req.body;

    await revisionRepository.updateById(revisionId, {
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

    let deletedRevision = await revisionRepository.deleteById(revisionId);

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

    let unitRevisionExam = await revisionRepository.findExamByRevisionId(revisionId);

    if (!unitRevisionExam)
        throw new APIError(status.NOT_FOUND, {
            message: messages.notFound,
            unitRevisionExam
        });

    res.status(status.OK).json({
        success: true,
        exam: unitRevisionExam
    })
}