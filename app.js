//module dependencies
const express = require('express');
const chalk = require('chalk');

var mysql = require('mysql');

//define connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "quangdaicA1@",
    insecureAuth: true
});

const app = express();

//config express
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);

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
app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});