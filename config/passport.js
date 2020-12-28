const { use } = require('passport');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const db = require("../models/index");
const Customer = db.customer;
const Manager = db.manager;
const Admin = db.admin;
const Receptionist = db.receptionist;
const bcrypt = require('bcrypt')


function sessionConstructor(userId, userGroup, details, role) {
    this.userId = userId;
    this.userGroup = userGroup;
    this.details = details;
}

passport.serializeUser((user, done) => {
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
    else if (user instanceof Admin) {
        userGroup = "Admin";
        userId = user.admin_id
    }
    else if (user instanceof Receptionist) {
        userGroup = "Receptionist";
        userId = user.receptionist_id
    }
    let session = new sessionConstructor(userId, userGroup, "");
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
    else if (session.userGroup == 'Admin') {
        Admin.findOne({ where: { admin_id: session.userId } })
            .then(data => {
                if (data) {
                    done(null, data);
                }
            })
            .catch(err => {
                return done(err);
            });
    }
    else if (session.userGroup == 'Receptionist') {
        Receptionist.findOne({ where: { receptionist_id: session.userId } })
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
            bcrypt.compare(password, data.password)
                .then((valid) => {
                    if (!valid) {
                        return done(null, false, { msg: 'Invalid email or password.' });
                    }
                    else {
                        return done(null, data);
                    }
                })

        })
        .catch(err => {
            return done(err);
        });
}));

passport.use('manager-local', new LocalStrategy('local', (account, password, done) => {
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

passport.use('admin-local', new LocalStrategy('local', (username, password, done) => {
    Admin.findOne({ where: { username: username.toLowerCase() } })
        .then(data => {
            if (!data) {
                return done(null, false, { msg: `username ${username} not found.` });
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

passport.use('receptionist-local', new LocalStrategy('local', (username, password, done) => {
    Receptionist.findOne({ where: { account: username.toLowerCase() } })
        .then(data => {
            if (!data) {
                return done(null, false, { msg: `account ${username} not found.` });
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