const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));//For Serving static files
app.use(express.urlencoded());
// Expose your img folder at the "/img" web route
app.use('/img', express.static(path.join(__dirname, 'img')));


//PUG SPECIFIC STUFF
app.set('view engine','pug');//set the template engine as pug
app.set('views', path.join(__dirname,'views'));//set the views directory

//ENDPOINT
app.get('/',(req, res)=>{
    
    const params = {}
    res.status(200).render('home.pug',params)
})

app.get('/contact',(req, res)=>{
    
    const params = {}
    res.status(200).render('contact.pug',params)
})

//START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`)
})