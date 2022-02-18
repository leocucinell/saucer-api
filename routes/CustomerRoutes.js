//SECTION: Imports & Router
const express = require('express');
const router = express.Router();

const cont = require('../controllers');

//SECTION: Routes
router.route('/reservation')
    .get(cont.customer.retrieveCustomerReservations)
    .post(cont.customer.addCustomerReservation)

//SECTION: Exports
module.exports = router