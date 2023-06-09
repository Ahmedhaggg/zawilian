const { db } = require('../config/database');
const { DataTypes } = require('sequelize');

const StudentCourse = db.define("studentCourse", {
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Student',
          key: 'id'
        }
    },
    unitArrangement: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    sectionArrangement: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    timestamps: false,
    tableName: "StudentCourse"
})

module.exports = StudentCourse;