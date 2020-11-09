const db = require("../models/index");
const Reservation = db.reservation;
const Customer = db.customer;
const SubService = db.subservice;
const Op = db.Sequelize.Op;
const passport = require('passport');
const moment = require('moment')
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.customer_id) {
        res.status(400).send({
            message: "please choose a customer"
        });
        return;
    }

    // Create a Tutorial
    const reservation = {
        customer_id: req.body.customer_id,
        checkin_time: req.body.checkin_time,
        reservation_date: req.body.reservation_date,
        status: req.body.status,
        sub_service_sub_service_id: req.body.sub_service_sub_service_id
    };

    // Save Tutorial in the database
    Reservation.create(reservation)
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
exports.findAllAccess = (req, res) => {
    Customer.hasMany(Reservation, { foreignKey: 'customer_id' })
    Reservation.belongsTo(Customer, { foreignKey: 'customer_id' })

    SubService.hasOne(Reservation, { foreignKey: 'sub_service_sub_service_id' })
    Reservation.belongsTo(SubService, { foreignKey: 'sub_service_sub_service_id' })

    Reservation.findAll({
        include: [{ model: Customer }, { model: SubService }],
        where: { is_access: 1 }
    })
        .then(data => {
            // console.log("data", data)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.findAllNotAccess = (req, res) => {
    Customer.hasMany(Reservation, { foreignKey: 'customer_id' })
    Reservation.belongsTo(Customer, { foreignKey: 'customer_id' })

    SubService.hasOne(Reservation, { foreignKey: 'sub_service_sub_service_id' })
    Reservation.belongsTo(SubService, { foreignKey: 'sub_service_sub_service_id' })

    Reservation.findAll({
        include: [{ model: Customer }, { model: SubService }],
        where: { is_access: 0 }
    })
        .then(data => {
            // console.log("data", data)
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
    // console.log('req.params.id', req.params.id)
    const id = req.params.id;
    console.log('req.body', req.body);
    Reservation.update(req.body, {
        where: { reservation_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Reservation was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Reservation with id=${id}. Maybe Customer was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Reservation with id=" + id
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Reservation.destroy({
        where: { reservation_id: id }
    })
        .then(data => {
            if (data == 1) {
                res.status(200).send({
                    message: "delete success",
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};
// Search
exports.searchGender = (req, res) => {
    console.log('req.params.gender', req.params.gender)
    const gender = req.params.gender;

    Manager.searchGender(req.body, {

        // where: {
        //     gender: gender
        // }
    })
        .then(data => {
            // console.log("data", data)
            if (gender == 1) {
                res.send(data);
            }

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
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
        res.status(500).send({ msg: "chua dang nhap" })
    }
};

exports.postLogin = (req, res, next) => {
    console.log('req', req.body)
    const validationErrors = [];
    if (!req.body.username) {
        validationErrors.push({ mes: "empty username" });
    }

    if (!req.body.password) {
        validationErrors.push({ mes: "empty password" });
    }

    passport.authenticate('manager-local', (err, manager, info) => {
        if (err) { return next(err); }
        console.log('manager', manager);
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
}

exports.findReservationFromTo = (req, res) => {

    // console.log("req.params.from", req.params.from);
    // console.log("req.params.to", req.params.to);
    // let temp = req.params.from.split('-');
    // let x = parseInt(temp[2], 10) + 1;
    // console.log('temp', x);

    // const from = new Date(temp[0] + "-" + temp[1] + "-" + x)
    const from = moment(req.params.from);
    const to = moment(req.params.to)
    // const from = new Date(req.params.from)
    // const to = new Date(req.params.to)

    let x = req.params.from
    // console.log('toLocaleTimeString', from.toLocaleTimeString());
    // console.log('moment().format()', moment(req.params.from));
    console.log("from", from);
    console.log("to", to);


    Reservation.findAll({
        where: {
            reservation_date: {
                [Op.between]: [from, to]
                // [Op.between]: [new Date(from), new Date(to)]
            }
        },
        order: [
            ['reservation_date', 'ASC'],
        ],
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving bill."
            });
        });
};