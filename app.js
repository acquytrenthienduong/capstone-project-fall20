//module dependencies
const express = require('express');
const chalk = require('chalk');
var bodyParser = require('body-parser');
const expressSession = require('express-session');
var passport = require('passport');
const flash = require('express-flash');
const Pusher = require('pusher');

const customerController = require('./controllers/customer');
const managerController = require('./controllers/manager');
const reservationDetailController = require('./controllers/reservationDetail');

const app = express();
const db = require("./models/index");

const pusher = new Pusher({
    appId: '1080579',
    key: 'a3d8de3b78a9366d487c',
    secret: '7a353b5eed42af620a35',
    cluster: 'ap1',
    encrypted: true
});

//config express
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8000);

//Middlewares
app.use(expressSession({ secret: 'keyboard cat' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
const passportConfig = require('./config/passport');

// init passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/posts', (req, res) => {
    console.log('this is middleware function')
});
db.sequelize.sync();

//schedule
app.post('/schedule', (req, res) => {
    const { body } = req;
    const data = {
        ...body,
        // set the selected property of the body to true
    };
    // console.log('data', data);
    // trigger a new-entry event on the vote-channel
    pusher.trigger('schedule', 'new-event', data);
    res.json(data);
});

app.get('/schedule', (req, res) => {
    res.json('hello');
});

//ROUTES
app.get('/', (req, res) => {
    res.send('home');
});

app.get('/post', (req, res) => {
    res.send('post');
});

// app routes
app.get('/loginCustomer', customerController.getLogin);
app.post('/loginCustomer', customerController.postLogin);
app.get('/logoutCustomer', customerController.logout);

app.get('/login', managerController.getLogin);
app.post('/login', managerController.postLogin);
app.get('/logout', managerController.logout);

app.get('/customer', customerController.findAll)
app.get('/manager', managerController.findAll)
app.post('/addManager', managerController.create)
app.post('/updateManager/:id', managerController.update)
app.get('/searchGender', managerController.searchGender)

app.get('/getAllReservationDetail', reservationDetailController.findAll)
// primary app routes


//Test. remove after
const users = [{ name: 'name', password: '123456' }];
app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/users', (req, res) => {
    // console.log(req.body);
    const user = { name: req.body.name, password: req.body.password };
    users.push(user);
    res.status(201).send();
})

//PORT
app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});