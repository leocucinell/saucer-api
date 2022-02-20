//SECTION: Imports & Router
const express = require('express');
const router = express.Router();

const cont = require('../controllers');

//SECTION: Routes
router.route('/reservation')
    .get(cont.restaurant.retrieveRestuarantReservations)
    .post(cont.restaurant.addRestuarantReservation);

router.route('/signup').post(cont.restaurant.restuarantSignUp);

//SECTION: Exports
module.exports = router;