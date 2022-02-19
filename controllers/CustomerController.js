//SECTION: Imports
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');

//SECTION: Controller methods
//Base: <url>/customer

//POST: /login
const customerLogin = (req, res) => {
    //check to see if the user exists
    //if it does, then check to see if their credentials work
}

//POST: /signup
const customerSignUp = async (req, res) => {
    //Check if a user exists with the username
    try{
        const UserCheck = await prisma.User.findFirst({
            where: {
                name: req.body.name
            }
        });
        if(!UserCheck){
            //if not, create the user&profile in the database
            try {
                const createdUser = await prisma.User.create({
                    data: {
                        name: req.body.name,
                        dietary_restrictions: req.body.dietary_restrictions
                    }
                });
                const hashedPassword = bcrypt.hash(req.body.password, 10, async (err, hash) => {
                    if(err){
                        res.send(`Error securing password, please try again: ${err}`)
                    }
                    const createdProfile = await prisma.profile.create({
                        data: {
                            email: req.body.email,
                            phone: req.body.phone,
                            password: hash,
                            owner_user_id: createdUser.id
                        }
                    });
                    //send back the created user info
                    res.status(200).json({
                        user: createdUser,
                        profile: createdProfile
                    });
                })
            } catch (err) {
                console.log(`Error creating user: ${err}`);
            }
        } else {
            res.send('User with that name already exists');
        }
    } catch(err) {
        console.log(`Error creating user: ${err}`)
    }
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