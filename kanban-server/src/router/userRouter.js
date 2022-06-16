"use strict"

const router = require('express').Router();
const userController = require('../controller/userController');

router.route('/authenticate').get(userController.authenticateUser);
router.route('/createUser').post(userController.createKanbanUser);
router.route('/loginUser').post(userController.loginKanbanUser);

module.exports = router;
