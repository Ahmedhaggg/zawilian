require("dotenv").config();

const { 
    JWT_SECRET,
    BCRYPT_SALT,
    DB_HOST,
    SERVER_PORT = 4000,
    DB_PORT,
    DB_NAME,
    DB_PASS,
    DB_USER,
    ADMIN_EMAIL,
    ADMIN_PASSWORD
} = process.env;

module.exports = { 
    JWT_SECRET, 
    BCRYPT_SALT, 
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_PASS,
    DB_USER,
    SERVER_PORT,
    ADMIN_EMAIL,
    ADMIN_PASSWORD
};