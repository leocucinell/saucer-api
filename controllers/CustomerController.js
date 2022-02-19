//SECTION: Imports
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//SECTION: Controller methods
//Base: <url>/customer

//POST: /login
const customerLogin = async (req, res) => {
    //check to see if the user exists
    try{
        const UserCheck = await prisma.User.findUnique({
            where: {
                name: req.body.name
            },
            //Also sends back the foreign profile of the user
            include: {
                profile: true
            }
        });

        if(UserCheck){
            //Use bcrypt to check if the password sent is the same as the one saved
            bcrypt.compare(req.body.password, UserCheck.profile.password, (err, result) => {
                if(err){
                    console.log(`Error hashing password: ${err}`);
                    res.send('Error logging in, check password');
                }
                if(result){
                    //items are the same! log the user in(send back jwt to access other functions)
                    const accessToken = jwt.sign(
                        {"username": UserCheck.name},
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn: '1d'}
                    );
                    const refreshToken = jwt.sign(
                        {"username": UserCheck.name},
                        process.env.REFRESH_TOKEN_SECRET,
                        {expiresIn: '1w'}
                    );
                    //update the client to include the refresh token
                    const updateUser = prisma.Profile.update({
                        where: {
                            id: UserCheck.profile.id
                        }, 
                        data: {
                            refreshToken: refreshToken
                        }
                    })
                    res.status(200).json({
                        message: 'Welcome back!',
                        userProfile: UserCheck,
                        accessToken,
                        refreshToken
                    })
                } else {
                    //wrong password!
                    res.send('Wrong password, try again!')
                }
            });
        }
    } catch(err) {
        console.log(`Error: ${err}`);
        res.send('Error logging in, please try again.')
    }
    //check with bcrypt to see if the password and hash compare
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