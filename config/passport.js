const { use } = require('passport');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const db = require("../models/index");
const Customer = db.customer;
const Manager = db.manager;

function sessionConstructor(userId, userGroup, details, role) {
    this.userId = userId;
    this.userGroup = userGroup;
    this.details = details;
}

passport.serializeUser((user, done) => {
    // console.log('user', user);
    let userGroup = "Customer";
    let userId = null;
    if (user instanceof Customer) {
        userGroup = "Customer";
        userId = user.customer_id
    }
    else if (user instanceof Manager) {
        userGroup = "Manager";
        userId = user.manager_id
    }
    let session = new sessionConstructor(userId, userGroup, "");
    console.log('session', session);
    done(null, session)
});

passport.deserializeUser((session, done) => {
    if (session.userGroup == 'Customer') {
        Customer.findOne({ where: { customer_id: session.userId } })
            .then(data => {
                if (data) {
                    done(null, data);
                }
            })
            .catch(err => {
                return done(err);
            });
    }
    else if (session.userGroup == 'Manager') {
        Manager.findOne({ where: { manager_id: session.userId } })
            .then(data => {
                if (data) {
                    done(null, data);
                }
            })
            .catch(err => {
                return done(err);
            });
    }
});

passport.use('customer-local', new LocalStrategy('local', (account, password, done) => {

    Customer.findOne({ where: { account: account.toLowerCase() } })
        .then(data => {
            if (!data) {
                return done(null, false, { msg: `username ${account} not found.` });
            }
            if (data.password === password) {
                return done(null, data);
            }
            else {
                return done(null, false, { msg: 'Invalid email or password.' });
            }
        })
        .catch(err => {
            return done(err);
        });
}));

passport.use('manager-local', new LocalStrategy('local', (account, password, done) => {
    console.log('account', account);
    Manager.findOne({ where: { account: account.toLowerCase() } })
        .then(data => {
            if (!data) {
                return done(null, false, { msg: `username ${account} not found.` });
            }
            if (data.password === password) {
                return done(null, data);
            }
            else {
                return done(null, false, { msg: 'Invalid email or password.' });
            }
        })
        .catch(err => {
            return done(err);
        });
}));

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};