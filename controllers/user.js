const passport = require('passport');

exports.getLogin = (req, res) => {
    if (req.user) {
        res.status(200).send({ msg: "da dang nhap" })
    }
    else {
        res.status(200).send({ msg: "chua dang nhap" })
    }
};

exports.postLogin = (req, res, next) => {
    const validationErrors = [];

    if (!req.body.username) {
        validationErrors.push({ mes: "empty username" });
    }

    if (!req.body.password) {
        validationErrors.push({ mes: "empty password" });
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            res.status(500).send({ msg: "sai" })
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            res.status(200).send({ msg: "longin success" })
        });
    })(req, res, next);
}

exports.logout = (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) console.log('Error : Failed to destroy the session during logout.', err);
        req.user = null;
        res.status(200).send({ msg: "longout success" })
    });
};