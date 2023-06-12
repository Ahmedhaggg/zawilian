const { db } = require('../config/database');
const { DataTypes } = require('sequelize');

const Section = db.define("section", {
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
    },
    type: {
        type: DataTypes.ENUM,
        values: ['lesson', 'revision'],
        allowNull: false
    },
    exam: {
        type: DataTypes.JSONB,
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: "Section"
})

module.exports = Section;