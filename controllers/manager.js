const db = require("../models/index");
const Manager = db.manager;
const Op = db.Sequelize.Op;
const passport = require('passport');

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.account) {
        res.status(400).send({
            message: "account can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const customer = {
        account: req.body.account,
        password: req.body.password,
        email: req.body.email,
        gender: req.body.gender
    };

    // Save Tutorial in the database
    Customer.create(customer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    Manager.findAll()
        .then(data => {
            console.log("data", data)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    Customer.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Customer.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Customer with id=" + id
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};

exports.getLogin = (req, res) => {
    console.log("get login manager", req.session.passport)
    if (req.user instanceof Manager) {
        res.status(200).send({ msg: "da dang nhap role manage" })
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

    passport.authenticate('manager-local', { session: false }, (err, manager, info) => {
        if (err) { return next(err); }
        if (!manager) {
            req.flash('errors', info);
            // return res.status(500).send({ msg: "login fail" })
            return res.redirect('/login');
        }
        req.logIn(manager, (err) => {
            if (err) { return next(err); }
            req.flash('success', { msg: 'Success! You are logged in.' });
            res.redirect(req.session.returnTo || '/');
        });
    })(req, res, next);
}

exports.logout = (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) console.log('Error : Failed to destroy the session during logout.', err);
        req.account = null;
        res.status(200).send({ msg: "longout success" })
    });
};