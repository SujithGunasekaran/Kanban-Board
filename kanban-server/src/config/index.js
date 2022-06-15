"use strict";

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    port: process.env.port,
    mongoURI: process.env.mongoURI,
    jwtSecret: process.env.jwtSecret
}
