const { db } = require('../config/database');
const { DataTypes } = require('sequelize');

const ExamSocre = db.define("examSocre", {
    courseRevisionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'CourseRevision',
          key: 'id'
        }
    },
    unitId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Unit',
            key: 'id'
        }
    },
    sectionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Section',
            key: 'id'
        }
    },
    examId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Exam',
            key: 'id'
        }
    },
    score: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    createdAt:{
        type: DataTypes.DATE,
        defaultValue: new Date()
    }
}, {
    timestamps: false,
    tableName: "ExamScore"
})


module.exports = ExamSocre;