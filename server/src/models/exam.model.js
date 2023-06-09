const { db } = require('../config/database');
const { DataTypes } = require('sequelize');

const Exam = db.define("exam", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    points: {
        type: DataTypes.STRING,
        allowNull: false
    },
    questions: {
        type: DataTypes.JSONB,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: "Exam"
})

module.exports = Exam;