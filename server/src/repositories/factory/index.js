const { catchErrorOnCreate } = require("../errorHandlers/index");

exports.count = Model => async (query = {}) => await Model.count({ where: query });

exports.updateById = Model => async (id, newData) => {
    let updatedItem = await Model.update(newData, { where: { id } });
    return updatedItem[0] === 1 ? true : false;
}

exports.deleteById = Model => async (id) => {
    let isDeleted = await Model.destroy({ where: { id } });
    
    return isDeleted ? true : false;
}

exports.create = Model => async (newData) =>  {
    try {
        return await Model.create(newData)
    } catch (error) {
        console.log(error)
        return catchErrorOnCreate(error)
    }
}
exports.findOne = (Model, attributes = null, include = null) => async query => await Model.findOne({
    where: query,
    attributes,
    include
})

exports.findById = (Model, attributes = null, include = null) => async id => await Model.findOne({
    where: { id },
    attributes,
    include
})

exports.findAll = (Model, attributes = null, include = null) => async (query = {}, offset = null, limit = null) => 
    await Model.findAll({
        where: query,
        attributes,
        include: include,
        offset,
        limit
    })