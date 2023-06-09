const { db } = require("../config/database");
const { DataTypes } = require("sequelize");

const Course = db.define("course", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    term: {
        type: DataTypes.ENUM([1, 2])
    },
    lastUnitArrangement: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    lastRevisionArrangement: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    }
}, {
    tableName: "Course"
});

module.exports = Course;