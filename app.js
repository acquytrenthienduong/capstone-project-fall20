//module dependencies
const express = require('express');
const chalk = require('chalk');
var bodyParser = require('body-parser');
const expressSession = require('express-session');
var mysql = require('mysql');
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//define & config connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "quangdaicA1@",
    insecureAuth: true
});

const userController = require('./controllers/user');

const app = express();

//config express
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);

//Middlewares
app.use(expressSession({ secret: 'keyboard cat' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const passportConfig = require('./config/passport');

// init passport
app.use(passport.initialize());
app.use(passport.session());

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

// app routes
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);


// primary app routes


//Test. remove after
const users = [{ name: 'name', password: '123456' }];
app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/users', (req, res) => {
    console.log(req.body);
    const user = { name: req.body.name, password: req.body.password };
    users.push(user);
    res.status(201).send();
})

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