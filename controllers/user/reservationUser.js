const db = require("../../models/index");
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
exports.findAllReservationOfCustomer = (req, res) => {
    const id = req.params.id;
    Customer.hasMany(Reservation, { foreignKey: 'customer_id' })
    Reservation.belongsTo(Customer, { foreignKey: 'customer_id' })

    SubService.hasOne(Reservation, { foreignKey: 'sub_service_sub_service_id' })
    Reservation.belongsTo(SubService, { foreignKey: 'sub_service_sub_service_id' })

    Reservation.findAll({
        include: [{ model: Customer }, { model: SubService }],
        where: { reservation_id: id }
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
