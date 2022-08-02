const express = require('express')

const mealtypecontroller = require('../controllers/mealtype')

const router = express.Router()

router.get('',mealtypecontroller.getallmealtype)

module.exports = router;
