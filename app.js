const express = require('express');
var mysql = require('mysql');

//define connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "quangdaicA1@",
    insecureAuth : true
});

const app = express();

//Middlewares
app.use('/posts', (req, res) => {
    console.log('this is middleware function')
});

//ROUTES
app.get('/', (req, res) => {
    res.send('home');
});

app.get('/post', (req, res) => {
    res.send('post');
});

//Connect Mysql
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

//PORT
app.listen(3000);