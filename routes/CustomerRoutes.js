//SECTION: Imports & Router
const express = require('express');
const router = express.Router();

const cont = require('../controllers');

//SECTION: Routes
router.route('/reservation')
    .get(cont.customer.retrieveCustomerReservations)
    .post(cont.customer.addCustomerReservation);

router.route('/login')
    .post(cont.customer.customerLogin);

router.route('/signup')
    .post(cont.customer.customerSignUp);

router.route('/signout')
    .post(cont.customer.customerSignOut);

//SECTION: Exports
module.exports = router