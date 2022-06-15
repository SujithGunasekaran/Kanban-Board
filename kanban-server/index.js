"use strict";

const express = require('express');
const cors = require('cors');
const connectMongodb = require('./src/mongodb');

// Initialize server
const server = express();

const PORT = process.env.port || 5000;

// parse request
server.use(express.json());

// restrict response header
server.use(cors({
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'x-powered-token']
}));

// establishing mongodb connection
connectMongodb();

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
