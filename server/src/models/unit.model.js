const { db } = require('../config/database');
const { DataTypes } = require('sequelize');

const Unit = db.define("unit", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    arrangement: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    lastSectionArrangement: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    exam: {
        type: DataTypes.JSONB,
        allowNull: true
    }
}, {
    timestamps: true,
    tableName: "Unit"
})

module.exports = Unit;