"use strict"

const kanbanUserModel = require('../mongodb/model/userModel');
const { JWT_SECRET } = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async authenticateUser(req, res) {
        try {
            const { userInfo = null } = req.session;
            if (!userInfo) throw new Error('User not authenticated');
            const decodedToken = jwt.verify(userInfo.token, `${JWT_SECRET}`);
            if (!decodedToken) throw new Error('Invalid Token');
            const { id } = decodedToken;
            const validUserDetail = kanbanUserModel.findOne({ _id: id });
            if (!validUserDetail) throw new Error('Invalid Token');
            res.status(200).json({
                status: 'Success',
                message: 'User Authenticated',
                userInfo: {
                    id: userInfo.id,
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
    async loginKanbanUser(req, res) {
        try {
            const { userName, password } = req.body;
            if (!userName || !password) throw new Error('Invalid Input');
            const userInfo = await kanbanUserModel.findOne({ userName });
            if (!userInfo) throw new Error('Invalid Username');
            const isPasswordMatched = await bcrypt.compare(password, userInfo.password);
            if (!isPasswordMatched) throw new Error('Invalid Password');
            const userDetails = {
                id: userInfo._id,
                userName: userInfo.userName
            }
            const token = jwt.sign(userDetails, `${JWT_SECRET}`, { expiresIn: '24h' });
            userDetails['token'] = token;
            req.session.userInfo = userDetails;
            req.session.save(err => {
                if (err) {
                    throw new Error('Error Creating the session');
                }
                res.status(200).json({
                    status: 'Success',
                    userInfo: {
                        id: userInfo._id,
                        userName: userInfo.userName
                    }
                });
            })
        }
        catch (err) {
            res.status(404).json({
                status: 'Failed',
                message: err.message
            })
        }
    },
    async logoutKanbanUser(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    throw new Error('Something went wrong');
                }
                res.clearCookie('kanbanSession');
                res.status(200).json({
                    status: 'Success',
                    message: 'Success'
                })
            })
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
