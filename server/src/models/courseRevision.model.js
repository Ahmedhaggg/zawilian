const { db } = require('../config/database');
const { DataTypes } = require('sequelize');

const CourseRevision = db.define("courseRevision", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    arrangement: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    video: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: "CourseRevision"
})

module.exports = CourseRevision;