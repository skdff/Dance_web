const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyparser = require("body-parser");
const port = 3000;
//Mongoose-DB Conection setup
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
  console.log("MongoDB connected");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//Defining the mongoose contact schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String

});

//Compiling the model
const Contact = mongoose.model('Contact', contactSchema);

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
//Getting the Post request
app.post('/contact', (req, res) => {

    var myData = new Contact(req.body);

    myData.save().then(() => {

        res.send(`
            <h2>The Data Item is saved Successfully</h2>

            <script>
                setTimeout(() => {
                    window.location.href = "/";
                }, 3000);
            </script>
        `);

    }).catch(() => {

        res.status(400).send("Data Item is not Saved Successfully");

    });

});

//START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`)
})