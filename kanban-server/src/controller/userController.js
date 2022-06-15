"use strict"

const kanbanUserModel = require('../mongodb/model/userModel');
const { jwtSecret } = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    async loginKanbanUser(req, res) {
        try {
            const { userName, password } = req.body;
            const userInfo = await kanbanUserModel.findOne({ userName });
            if (!userInfo) throw new Error('Invalid Username');
            const isPasswordMatched = await bcrypt.compare(password, userInfo.password);
            if (!isPasswordMatched) throw new Error('Invalid Password');
            const jwtToken = jwt.sign({ id: userInfo._id }, `${jwtSecret}`, { expiresIn: '24hr' });
            res.status(200).json({
                status: 'Success',
                jwtToken,
                userInfo: {
                    id: userInfo._id,
                    userName: userInfo.userName
                }
            });
        }
        catch (err) {
            res.status(404).json({
                status: 'Failed',
                message: err.message
            })
        }
    },
    async createKanbanUser(req, res) {
        try {
            const { userName, password } = req.body;
            const isUserNameExists = await kanbanUserModel.findOne({ userName });
            if (isUserNameExists) throw new Error('Username already taken');
            const hashedValue = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(password, hashedValue);
            const newUser = await kanbanUserModel.create({ userName, password: encryptedPassword });
            if (!newUser) throw new Error('Error while creating the user');
            res.status(200).json({
                status: 'Success',
                message: 'User created Successfully'
            });
        }
        catch (err) {
            res.status(404).json({
                status: 'Failed',
                message: err.message
            });
        }
    }
}
