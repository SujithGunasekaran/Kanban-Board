"use strict";

const mongoose = require('mongoose');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session')(session);
const { MONGO_URI } = require('../config');

require('./model/userModel');

exports.connectMongodb = function () {

    mongoose.connect(`${MONGO_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, () => {
        console.log("mongodb Connected successfully");
    })

}

exports.createMongodbSession = function () {
    const store = new mongodbStore({
        uri: `${MONGO_URI}`,
        collection: 'kanbanSession'
    });

    return store;
}
