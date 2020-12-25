//module dependencies
const express = require('express');
const chalk = require('chalk');
var bodyParser = require('body-parser');
const expressSession = require('express-session');
var passport = require('passport');
const flash = require('express-flash');
const Pusher = require('pusher');
var cors = require('cors')
require('dotenv').config();


const customerController = require('./controllers/user/customer');
const reservationUserController = require('./controllers/user/reservationUser');

const managerController = require('./controllers/manager');
const adminController = require('./controllers/admin');
const staffController = require('./controllers/staff');
const shiftController = require('./controllers/shift');
const notificationController = require('./controllers/notification');
const notificationUserController = require('./controllers/user/notificationUser');
const receptionistController = require('./controllers/receptionist');
const reservationController = require('./controllers/reservation');
const subServiceController = require('./controllers/subService');
const billController = require('./controllers/bill');
const activityController = require('./controllers/activity');


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

app.use(cors());

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
// app.post('/schedule', (req, res) => {
//     const { body } = req;
//     const data = {
//         ...body,
//         // set the selected property of the body to true
//     };
//     // console.log('data', data);
//     // trigger a new-entry event on the vote-channel
//     pusher.trigger('schedule', 'new-event', data);
//     res.json(data);
// });

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

//customer
app.get('/loginCustomer', customerController.getLogin);
app.post('/loginCustomer', customerController.postLogin);
app.get('/logoutCustomer', customerController.logout);
app.post('/register', customerController.create);
app.post('/updateCustomer/:id', customerController.updateById);
app.get('/customer', customerController.findAll)
app.get('/findAllByAccount/:account', customerController.findAllByAccount)
app.get('/findOne/:account', customerController.findByAccount)
app.post('/createNewReservationForUser', reservationUserController.create)
app.get('/findAllReservationOfCustomer/:id', reservationUserController.findAllReservationOfCustomer)
app.get('/subServiceFindOne/:id', subServiceController.findOne)
app.get('/findNotificationForCustomer/:id', notificationUserController.findAllNotificationForCustomer)
app.post('/createNotification', notificationUserController.create)
app.post('/UserSeenNoti/:id', notificationUserController.seenOne)
app.post('/updateProfile/:id', customerController.updateById)
app.post('/changePassword/:id', customerController.changePassword)
app.get('/loadCustomer/:id', customerController.findOne)
app.get('/loadCustomerByEmail/:email', customerController.findByEmail)
//---------------------------------------------------------------------------------//
//manager
app.get('/loginManager', managerController.getLogin);
app.post('/loginManager', managerController.postLogin);
app.get('/logoutManager', managerController.logout);
app.get('/findAllCustomer', customerController.findAll);
//receptionist
app.get('/loginReceptionist', receptionistController.getLogin);
app.post('/loginReceptionist', receptionistController.postLogin);
app.get('/logoutReceptionist', receptionistController.logout);

//admin
app.get('/loginAdmin', adminController.getLogin);
app.post('/loginAdmin', adminController.postLogin);
app.get('/logoutAdmin', adminController.logout);
app.get('/searchCustomer/:account', customerController.SearchCustomerByAccount)
app.get('/findRegister/:from/:to', customerController.findRegisterFromTo)

//shift
app.get('/shift', shiftController.findAll)
app.get('/getShiftByID/:id', shiftController.findOne)

//manager
// app.get('/customer', customerController.findAll)
app.get('/manager', managerController.findAll)
app.get('/getManagerByID/:id', managerController.findOne)
app.delete('/manager/:id', managerController.delete)
app.post('/addManager', managerController.create)
app.post('/updateManager/:id', managerController.update)
app.get('/find/:gender', managerController.findByGender)

//staff
app.post('/addStaff', staffController.create)
app.get('/staff', staffController.findAll)
app.post('/staffUpdate/:staff_id', staffController.update)
app.get('/findId/:staff_id', staffController.findOne)
app.delete('/deleteStaff/:id', staffController.delete)

//reservation
app.get('/getAllReservationAccess', reservationController.findAllAccess)
app.get('/getAllReservationNotAccess', reservationController.findAllNotAccess)
app.get('/getAllReservationChange', reservationController.findAllChange)
app.post('/updateReservation/:id', reservationController.update)
app.post('/createNewReservation', reservationController.create)
app.delete('/deleteReservation/:id', reservationController.delete)
app.get('/findReservation/:from/:to', reservationController.findReservationFromTo)


//subService
app.get('/getAllSubService/:type', subServiceController.findByType)
app.get('/getAllServices', subServiceController.findAll)
app.post('/addServices', subServiceController.create)
app.delete('/deleteService/:id', subServiceController.delete)
app.post('/updateService/:id', subServiceController.update)
app.get('/getServiceByID/:id', subServiceController.findOne)


//notification
app.post('/createNotification/:id', notificationController.create)
app.get('/getNotificationForManager', notificationController.findAllNotificationForManager)
app.post('/seenNoti/:id', notificationController.seenNoti)

//receptionist
app.post('/addReceptionist', receptionistController.create)
app.get('/receptionist', receptionistController.findAll)
app.get('/getReceptionistByID/:id', receptionistController.findOne)
app.delete('/deleteReceptionist/:id', receptionistController.delete)
app.post('/updateReceptionist/:id', receptionistController.update)
// primary app routes

//bill
app.post('/createBill', billController.create)
app.get('/findAllBill', billController.findAll)
app.get('/findBillToday', billController.findToday)
app.get('/findBillMonth', billController.findMonth)
app.get('/findBill/:from/:to', billController.findAllInFromTo)

app.post('/createActivity', activityController.create);
app.get('/findAllActivity', activityController.findAll)

//PORT
app.listen(app.get('port'), () => {
    console.log('process.env.DB', process.env.DB);
    console.log('process.env.DB', process.env.USER);
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});
