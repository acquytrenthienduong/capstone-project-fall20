const db = require("../models/index");
const Admin = db.admin;
const passport = require("passport");

exports.getLogin = (req, res) => {
    console.log("get login admin", req.user);
    if (req.user instanceof Admin) {
        res.status(200).send({ msg: "da dang nhap role admin" });
    } else {
        res.status(500).send({ msg: "chua dang nhap" });
    }
};

exports.postLogin = (req, res, next) => {
    console.log("admin dit me may", req.body);
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
        console.log("1", admin);
        if (!admin) {
            // req.flash("errors", info);
            // return res.status(500).send({ msg: "login fail" })
            return res.redirect("/login");
        }
        req.logIn(admin, (err) => {
            console.log("2", admin)
            if (err) {
                return next(err);
            }
            //req.flash("success", { msg: "Success! You are logged in." });
            // console.log('(req.session.returnTo', req.session.returnTo)
            // res.redirect(req.session.returnTo || "/");
            res.status(200).send(admin)
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err)
            console.log("Error : Failed to destroy the session during logout.", err);
        req.account = null;
        res.status(200).send({ msg: "longout success" });
    });
};