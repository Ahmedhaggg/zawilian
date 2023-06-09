const { DataTypes } = require("sequelize");
const { db } = require("../config/database");

const Grade = db.define("grade", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: "Grade"
});

module.exports = Grade;
