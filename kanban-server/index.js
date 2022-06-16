"use strict";

const express = require('express');
const cors = require('cors');
const { connectMongodb } = require('./src/mongodb');
const { createSession } = require('./src/session');

// router
const userRouter = require('./src/router/userRouter');

// Initialize server
const server = express();

const PORT = process.env.port || 5000;

// parse request
server.use(express.json());

// restrict response header
server.use(cors({
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// establishing mongodb connection
connectMongodb();

// creating the session
createSession(server);

server.use('/api/v1/user', userRouter);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
