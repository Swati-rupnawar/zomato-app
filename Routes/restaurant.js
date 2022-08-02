// import express
const express = require('express')

const restaurantcontroller = require('../controllers/restaurant')

const router = express.Router();

router.get('',restaurantcontroller.getAllRestaurant)

router.get('/:cName',restaurantcontroller.getRestaurantBycity)

router.get('/details/:name',restaurantcontroller.getRestaurantDetails)


router.post('/filter/:pageNo',restaurantcontroller.getAllRestaurantsByFilter)

// router.post('',restaurantcontroller.getRestaurant)

router.put('',restaurantcontroller.updateRestaurant)

router.delete('/:id',restaurantcontroller.deleteRestaurant)

// export
module.exports = router;
