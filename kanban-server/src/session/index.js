"use strict"

const session = require('express-session');
const { createMongodbSession } = require('../mongodb');
const { SESSION_SECRET } = require('../config');

exports.createSession = function (server) {

    const sessionInfo = {
        name: 'kanbanSession',
        secret: SESSION_SECRET,
        cookie: { maxAge: 24 * 60 * 60 * 1000 },
        resave: false,
        saveUninitialized: false,
        store: createMongodbSession()
    }

    server.use(session(sessionInfo));

}
