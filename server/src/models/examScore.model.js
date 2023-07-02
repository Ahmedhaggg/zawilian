const { db } = require('../config/database');
const { DataTypes } = require('sequelize');

const ExamSocre = db.define("examScore", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    courseRevisionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        references: {
          model: 'CourseRevision',
          key: 'id'
        }
    },
    unitId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        references: {
            model: 'Unit',
            key: 'id'
        }
    },
    sectionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        references: {
            model: 'Section',
            key: 'id'
        }
    },
    score: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    createdAt:{
        type: DataTypes.DATE,
        defaultValue: new Date()
    }
}, {
    timestamps: false,
    tableName: "ExamScore",
    
})


module.exports = ExamSocre;