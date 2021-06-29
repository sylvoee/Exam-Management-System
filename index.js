const express = require('express');
const app = express();
const router = require('./routes/allRoutes');
const bodyParser = require('body-parser');


  
// middleware body parser
app.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// load all routes route
app.use('/', router);



const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`);
});
