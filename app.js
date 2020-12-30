const express = require("express");
const path = require("path");
const bodyparser = require("body-parser")
const app = express();

// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });
const port = 8000;
//schema for mongoose
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,

});
const Contact = mongoose.model('Contact', contactSchema);

//Express specific stuff
app.use('/static', express.static('static')) //for serving static files
app.use(express.urlencoded());
//pug specific stuff
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//endpoints
app.get('/', (req, res) => {

    res.status(200).render('home.pug');
})

app.get('/contact', (req, res) => {

    res.status(200).render('contact.pug');
})
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    console.log(myData);
    myData.save().then(() => {
        res.send("Contact saved successfully");
    }).catch(() => {
        res.status(400).send("Not saved")
    });

})

//server
app.listen(port, () => {
    console.log(`the application is running on port ${port}`)
})


