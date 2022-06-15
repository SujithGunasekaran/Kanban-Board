"use strict";

const mongoose = require('mongoose');
const { mongoURI } = require('../config');

require('./model/userModel');

module.exports = function () {

    mongoose.connect(`${mongoURI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, () => {
        console.log("mongodb Connected successfully");
    })

}
