//module dependencies
const express = require('express');
const chalk = require('chalk');
var bodyParser = require('body-parser');
const expressSession = require('express-session');
var passport = require('passport');
const flash = require('express-flash');
const Pusher = require('pusher');
var cors = require('cors')


const customerController = require('./controllers/user/customer');
const reservationUserController = require('./controllers/user/reservationUser');

const managerController = require('./controllers/manager');
const adminController = require('./controllers/admin');
const staffController = require('./controllers/staff');
const shiftController = require('./controllers/shift');
const notificationController = require('./controllers/notification');
const receptionistController = require('./controllers/receptionist');
const reservationController = require('./controllers/reservation');
const subServiceController = require('./controllers/subService');
const billController = require('./controllers/bill');
const productController = require('./controllers/product');


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
app.get('/customer', customerController.findAll)
app.get('/findAllByAccount/:account', customerController.findAllByAccount)
app.post('/createNewReservationForUser', reservationUserController.create)
app.get('/findAllReservationOfCustomer/:id', reservationUserController.findAllReservationOfCustomer)
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
app.post('/updateReservation/:id', reservationController.update)
app.post('/createNewReservation', reservationController.create)
app.delete('/deleteReservation/:id', reservationController.delete)
app.get('/findReservation/:from/:to', reservationController.findReservationFromTo)


//subService
app.get('/getAllSubService/:type', subServiceController.findByType)

//products
// app.get('/products', productController.findAll)
// app.get('/getProductByID/:id', productController.findOne)
// app.delete('/product/:id', productController.delete)
// app.post('/addProduct', productController.create)
// app.post('/updateProduct/:id', productController.update)
// app.post("/addProduct", upload.single("img_url"), productController.addProduct);

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
