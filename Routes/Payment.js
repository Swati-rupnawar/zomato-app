const express = require('express')


const paymentcontroller = require('../controllers/Payment')

const router = express.Router()

router.post('',paymentcontroller.completePayment)
router.post('/save',paymentcontroller.saveTransaction)


module.exports = router;