const express = require('express')


const menucontrollers = require('../controllers/menu')

const router = express.Router()

router.get('/:rName',menucontrollers.getallmenu)


module.exports = router;

