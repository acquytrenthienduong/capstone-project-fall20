const db = require("../models/index");
const Admin = db.admin;
const passport = require("passport");
// get login status
exports.getLogin = (req, res) => {
    if (req.user instanceof Admin) {
        res.status(200).send({ msg: "da dang nhap role admin" });
    } else {
        res.status(500).send({ msg: "chua dang nhap" });
    }
};
// login for admin
exports.postLogin = (req, res, next) => {
    const validationErrors = [];
    if (!req.body.username) {
        validationErrors.push({ mes: "empty username" });
    }

    if (!req.body.password) {
        validationErrors.push({ mes: "empty password" });
    }

    passport.authenticate("admin-local", (err, admin, info) => {
        if (err) {
            return next(err);
        }
        if (!admin) {
            // req.flash("errors", info);
            // return res.status(500).send({ msg: "login fail" })
            return res.redirect("/login");
        }
        req.logIn(admin, (err) => {
            if (err) {
                return next(err);
            }
            res.status(200).send(admin)
        });
    })(req, res, next);
};
// logout for admin
exports.logout = (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err)
            console.log("Error : Failed to destroy the session during logout.", err);
        req.account = null;
        res.status(200).send({ msg: "longout success" });
    });
};