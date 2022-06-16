"use strict";

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.port,
    MONGO_URI: process.env.mongoURI,
    JWT_SECRET: process.env.jwtSecret,
    SESSION_SECRET: process.env.sessionSecret
}
