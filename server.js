require('dotenv').config()
const express = require('express');
const app = express();
const routes = require('./routes')

const bodyParser = require('body-parser');

//SECTION: 3rd party middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//SECTION: Route based middleware
app.use("/customer", routes.customer);
app.use('/restuarant', routes.restuarant);

//SECTION: Server binding
const port = process.env.PORT || 3500
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});