//SECTION: Imports
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//SECTION: Controller methods
//Base: <url>/restuarant

//POST: /signup
const restuarantSignUp = async (req, res) => {
    try{
        //Check to see if the location is already in use
        const restuarantCheck = await prisma.restuarant.findUnique({
            where: {
                name: req.body.name
            }
        });
        if(!restuarantCheck){
            //no other restuarant at that location
            const createdResturaunt = await prisma.restuarant.create({
                data: {
                    title: req.body.title,
                    location: req.body.location,
                    owner_id: req.body.owner_id //NOTE: maybe change this to a decryption of the access token
                }
            });

            //Should already have a registered owner(Profile), just send back success message
            res.status(200).json({
                message: 'Successfully created resturaunt!',
                resturaunt: createdResturaunt
            });

        } else {
            res.send('Restuarant already registered at that location.')
        }
    } catch(err){
        console.log(`Error: ${err}`);
        res.send('Error creating new restuarant. please try again');
    }
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
    restuarantSignUp,
    retrieveRestuarantReservations,
    addRestuarantReservation
}