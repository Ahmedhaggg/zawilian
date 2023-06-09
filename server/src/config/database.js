const { Sequelize } = require("sequelize");

const { 
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS
} = require("./index");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: "postgres"
});

(async () => {
    try {
        await sequelize.authenticate()
        console.log("database connected")
    } catch (err) {
        console.log("database error", err)
    }
})()

exports.db = sequelize;