"use strict";

const { Schema, model } = require('mongoose');


const kanbanUser = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const kanbanUserModel = model('kanbanUser', kanbanUser);

module.exports = kanbanUserModel;
