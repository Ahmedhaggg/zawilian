const { db } = require('../config/database');
const { DataTypes } = require('sequelize');
const hashing = require('../helpers/hash');

const Student = db.define('student', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }, 
    acceptedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: "Student",
    hooks: {
        beforeCreate: async (student) => {
            const hashedPassword = await hashing.hash(student.password);
            student.password = hashedPassword;
        }
    }
});

module.exports = Student;
