//SECTION: Imports
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//SECTION: Controller methods
//Base: <url>/restuarant

//POST: /login
const restuarantLogin = (req, res) => {
    res.send('Restaurant login');
}

//POST: /signup
const restuarantSignUp = (req, res) => {
    res.send('Restaurant sign up');
}

//POST: /signout
const restuarantSignOut = (req, res) => {
    res.send('Restaurant sign out');
}

//GET: /reservation
const retrieveRestuarantReservations = (req, res) => {
    res.send('Retrieve Restuarant Reservations');
}

//POST: /reservation
const addRestuarantReservation = (req, res) => {
    res.send('Add Restuarant Reservation');
}

//SECTION: Exports
module.exports = {
    restuarantLogin,
    restuarantSignUp,
    restuarantSignOut,
    retrieveRestuarantReservations,
    addRestuarantReservation
}