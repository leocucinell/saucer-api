//SECTION: Imports

//SECTION: Controller methods
//Base: <url>/customer

//POST: /login
const customerLogin = (req, res) => {
    res.send('Customer login');
}

//POST: /signup
const customerSignUp = (req, res) => {
    res.send('Customer sign up');
}

//POST: /signout
const customerSignOut = (req, res) => {
    res.send('Customer sign out');
}

//GET: /reservation
const retrieveCustomerReservations = (req, res) => {
    res.send('Retrieve Customer Reservations');
}

//POST: /reservation
const addCustomerReservation = (req, res) => {
    res.send('Add Customer Reservation');
}

//SECTION: Exports
module.exports = {
    customerLogin,
    customerSignUp,
    customerSignOut,
    retrieveCustomerReservations,
    addCustomerReservation
}