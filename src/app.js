const express = require('express');
const path = require("path");
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 8000;

const staticpath = path.join(__dirname,'../public');
app.use(express.static(staticpath));

const partialspath = path.join(__dirname,'../templates/partials');
const viewspath = path.join(__dirname,'../templates/views');

app.set('view engine', 'hbs');
app.set('views',viewspath);
hbs.registerPartials(partialspath);

app.get('/',(req,res) => {
    // res.send('<h1>home page</h1>');
    res.render('index');
});

app.get('/about',(req,res) => {
    // res.send('about page');
    res.render('about');
});

app.get('/weather',(req,res) => {
    // res.send('weather page');
    res.render('weather');
});

app.get('*',(req,res) => {
    // res.send('Error 404 page not found');
    res.render('error404',{
        errormsg: 'Error 404 Page Not Found'
    });
});

app.listen(port,() => {
    console.log(`listening to port ${port}`);
});