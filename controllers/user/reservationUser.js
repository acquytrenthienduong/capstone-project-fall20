const db = require("../../models/index");
const Reservation = db.reservation;
const Customer = db.customer;
const SubService = db.subservice;

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
        reservation_time: req.body.reservation_time,
        reservation_date: req.body.reservation_date,
        status: req.body.status,
        sub_service_sub_service_id: req.body.sub_service_sub_service_id,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day
    };
    let dateRaw = new Date(req.body.reservation_date);
    let year = dateRaw.getFullYear();
    let month = dateRaw.getMonth() + 1;
    let dt = dateRaw.getDate();
    var temp = reservation.checkin_time.split(':');
    let from = parseInt(temp[0], 10) + ":" + "00" + ":" + "00";
    let to = parseInt(temp[0], 10) + 1 + ":" + "00" + ":" + "00";
    // Save Reservation in the database
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
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the reservation."
            });
        });
};

// get all reservation of customer
exports.findAllReservationOfCustomer = (req, res) => {
    const id = req.params.id;
    Customer.hasMany(Reservation, { foreignKey: 'customer_id' })
    Reservation.belongsTo(Customer, { foreignKey: 'customer_id' })

    SubService.hasOne(Reservation, { foreignKey: 'sub_service_sub_service_id' })
    Reservation.belongsTo(SubService, { foreignKey: 'sub_service_sub_service_id' })

    Reservation.findAll({
        include: [{ model: Customer }, { model: SubService }],
        where: { customer_id: id },
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
                    err.message || "Some error occurred while retrieving Reservation."
            });
        });
};

// get all reservation not access of customer
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
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Reservation."
            });
        });
};

// get one reservation
exports.findOne = (req, res) => {
    const id = req.params.id

    Customer.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Reservation with id=" + id
            });
        });
};

// update reservation
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

// remove reservation
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
