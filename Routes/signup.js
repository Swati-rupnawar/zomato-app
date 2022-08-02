const express = require('express')

const UserController = require('../controllers/signup')

const router = express.Router();

router.post('',UserController.signup)


module.exports = router;