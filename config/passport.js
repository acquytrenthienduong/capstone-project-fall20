const passport = require('passport');
const axios = require('axios');
const { Strategy: LocalStrategy } = require('passport-local');

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

const users = [{ username: 'admin', password: 'admin' }, { username: 'admin1', password: 'admin1' }]

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((id, done) => {
    console.log('id', id);
    var flag = false;
    users.forEach(element => {
        if (element.username === id) {
            flag = true;
            done(null, element);
        }
    });
    if (!flag) {
        done(err, false);
    }
});

passport.use(new LocalStrategy('local', (username, password, done) => {
    console.log("localstrategy", username)

    if (username === 'admin' && password === 'admin') {
        var user = {};
        user.username = username;
        user.password = password;
        return done(null, user);
    }
    else {
        return done(null, false, { msg: 'Invalid email or password.' });
    }
}));