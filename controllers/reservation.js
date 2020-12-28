const db = require("../models/index");
const Reservation = db.reservation;
const Customer = db.customer;
const SubService = db.subservice;
const Op = db.Sequelize.Op;
const passport = require('passport');
const moment = require('moment');
// const { TIME } = require("sequelize/types");
// Create and Save a new Reservation
exports.create = (req, res) => {
    // Validate request
    if (!req.body.customer_id) {
        res.status(400).send({
            message: "please choose a customer"
        });
        return;
    }

    // Create a Reservation
    const reservation = {
        customer_id: req.body.customer_id,
        checkin_time: req.body.checkin_time,
        reservation_date: req.body.reservation_date,
        status: req.body.status,
        sub_service_sub_service_id: req.body.sub_service_sub_service_id,
        is_access: req.body.is_access,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        reservation_time: req.body.reservation_time
    };
    let dateRaw = new Date(req.body.reservation_date);
    let year = dateRaw.getFullYear();
    let month = dateRaw.getMonth() + 1;
    let dt = dateRaw.getDate();
    var temp = reservation.checkin_time.split(':');
    let from = parseInt(temp[0], 10) + ":" + "00" + ":" + "00";
    let to = parseInt(temp[0], 10) + 1 + ":" + "00" + ":" + "00";

    Reservation.findAll({
        where: {
            year: year,
            month: month,
            day: dt,
            checkin_time: {
                [Op.between]: [from, to]
            },
            is_access: 1
        }
    })
        .then(data => {
            if (data.length < 3) {
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
            }
            else {
                res.status(201).send({
                    message: "we are full in time"
                });
            }
        })
    // var then = moment(now).subtract(20, "minutes").toDate()
    // Save Tutorial in the database
    // Reservation.create(reservation)
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while creating the Tutorial."
    //         });
    //     });
};

// Retrieve all Reservation from the database.
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
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Can not find"
            });
        });
};
// get all Reservation not access
exports.findAllNotAccess = (req, res) => {
    Customer.hasMany(Reservation, { foreignKey: 'customer_id' })
    Reservation.belongsTo(Customer, { foreignKey: 'customer_id' })

    SubService.hasOne(Reservation, { foreignKey: 'sub_service_sub_service_id' })
    Reservation.belongsTo(SubService, { foreignKey: 'sub_service_sub_service_id' })

    Reservation.findAll({
        include: [{ model: Customer }, { model: SubService }],
        where: { is_access: 0 },
        order: [
            ['reservation_date', 'DESC'],
        ],
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "find all not access fail"
            });
        });
};
// get all Reservation in change
exports.findAllChange = (req, res) => {
    Customer.hasMany(Reservation, { foreignKey: 'customer_id' })
    Reservation.belongsTo(Customer, { foreignKey: 'customer_id' })

    SubService.hasOne(Reservation, { foreignKey: 'sub_service_sub_service_id' })
    Reservation.belongsTo(SubService, { foreignKey: 'sub_service_sub_service_id' })

    Reservation.findAll({
        include: [{ model: Customer }, { model: SubService }],
        where: { is_access: 2 },
        order: [
            ['reservation_date', 'DESC'],
        ],
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "find all not access fail"
            });
        });
};

// Find a single Reservation with an id
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

// Update a Reservation by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
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
                    message: `Cannot update Reservation with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Reservation with id=" + id
            });
        });
};

// Delete a Reservation with the specified id in the request
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
                    err.message || "delete fail"
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};
// Search
exports.searchGender = (req, res) => {
    const gender = req.params.gender;

    Manager.searchGender(req.body, {

        // where: {
        //     gender: gender
        // }
    })
        .then(data => {
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
    if (req.user instanceof Manager) {
        res.status(200).send({ msg: "da dang nhap role manage" })
    }
    else {
        res.status(500).send({ msg: "chua dang nhap" })
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

    passport.authenticate('manager-local', (err, manager, info) => {
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
}
// get Reservation in time
exports.findReservationFromTo = (req, res) => {
    const from = moment(req.params.from);
    const to = moment(req.params.to)
    Reservation.findAll({
        where: {
            is_access: 1,
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
                    err.message || "Some error occurred while finding"
            });
        });
};