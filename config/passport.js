const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const db = require("../models/index");
const Customer = db.customer;

passport.serializeUser((customer, done) => {
    done(null, customer.account);
});

passport.deserializeUser((account, done) => {
    Customer.findOne({ account: account })
        .then(data => {
            if (data) {
                done(null, data);
            }
        })
        .catch(err => {
            return done(err);
        });
});

passport.use(new LocalStrategy('local', (account, password, done) => {
    Customer.findOne({ account: account.toLowerCase() })
        .then(data => {
            console.log('data', data)
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