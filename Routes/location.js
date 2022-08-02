const express = require('express')

const Locationcontroller = require('../controllers/location')

const router = express.Router();

router.get('',Locationcontroller.getAllLocations)


module.exports = router;