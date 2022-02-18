//SECTION: Imports & Router
const express = require('express');
const router = express.Router();

const cont = require('../controllers');

//SECTION: Routes
router.route('/reservation')
    .get(cont.restaurant.retrieveRestuarantReservations)
    .post(cont.restaurant.addRestuarantReservation);

router.route('/login').post(cont.restaurant.restuarantLogin);

router.route('/signup').post(cont.restaurant.restuarantSignUp);
    
router.route('/signout').post(cont.restaurant.restuarantSignOut);

//SECTION: Exports
module.exports = router;