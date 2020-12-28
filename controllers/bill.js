const db = require("../models/index");
const Op = db.Sequelize.Op;
const Bill = db.bill;
const Reservation = db.reservation;
const Customer = db.customer;
const SubService = db.subservice;

const moment = require('moment')
// create bill 
exports.create = (req, res) => {
    // Validate request
    if (!req.body.total_money) {
        res.status(400).send({
            message: "money can't empty!",
        });
        return;
    }

    // Create a Tutorial
    const bill = {
        total_money: req.body.total_money,
        status: req.body.status,
        time: req.body.time,
        date: req.body.date,
        payment_method_payment_method_id: req.body.payment_method_payment_method_id,
        reservation_reservation_id: req.body.reservation_reservation_id,
        sub_service_sub_service_id: req.body.sub_service_sub_service_id,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day
    };

    Bill.findAll({
        where: { reservation_reservation_id: bill.reservation_reservation_id }
    })
        .then(data => {
            if (data.length > 0) {
                res.status(201).send({ msg: "Bill created" })
            }
            else {
                Bill.create(bill)
                    .then((data) => {
                        res.send(data);
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Bill.",
                        });
                    });
            }
        })
};
// get all bill
exports.findAll = (req, res) => {

    Customer.hasMany(Reservation, { foreignKey: 'customer_id' })
    Reservation.belongsTo(Customer, { foreignKey: 'customer_id' })

    Reservation.hasMany(Bill, { foreignKey: "reservation_reservation_id" })
    Bill.belongsTo(Reservation, { foreignKey: "reservation_reservation_id" })

    SubService.hasOne(Reservation, { foreignKey: 'sub_service_sub_service_id' })
    Reservation.belongsTo(SubService, { foreignKey: 'sub_service_sub_service_id' })

    // SubService.hasMany(Bill, { foreignKey: 'sub_service_sub_service_id' })
    // Bill.belongsTo(SubService, { foreignKey: 'sub_service_sub_service_id' })

    Bill.findAll({
        include: [{
            model: Reservation,
            include: [
                { model: Customer },
                {
                    model: SubService
                }
            ]
        }],

        order: [
            ['date', 'DESC'],
        ],
    })
        .then(data => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Bill.",
            });
        })
}
// get bill in time
exports.findAllInFromTo = (req, res) => {
    const from = moment(req.params.from);
    const to = moment(req.params.to)
    Bill.findAll({
        where: {
            date: {
                [Op.between]: [from, to]
            }
        },
        order: [
            ['date', 'ASC'],
        ],
    })
        .then(data => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Bill.",
            });
        })
}
// get bill today
exports.findToday = (req, res) => {
    let dateRaw = new Date();
    let year = dateRaw.getFullYear();
    let month = dateRaw.getMonth() + 1;
    let dt = dateRaw.getDate();

    Customer.hasMany(Reservation, { foreignKey: 'customer_id' })
    Reservation.belongsTo(Customer, { foreignKey: 'customer_id' })

    Reservation.hasMany(Bill, { foreignKey: "reservation_reservation_id" })
    Bill.belongsTo(Reservation, { foreignKey: "reservation_reservation_id" })

    SubService.hasOne(Reservation, { foreignKey: 'sub_service_sub_service_id' })
    Reservation.belongsTo(SubService, { foreignKey: 'sub_service_sub_service_id' })

    Bill.findAll({
        include: [{
            model: Reservation,
            include: [
                { model: Customer },
                {
                    model: SubService
                }
            ]
        }],
        where: {
            year: year,
            month: month,
            day: dt,
        },
        order: [
            ['date', 'DESC'],
        ],
    })
        .then(data => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Bill.",
            });
        })
}
// get bill in month
exports.findMonth = (req, res) => {
    let dateRaw = new Date();
    let year = dateRaw.getFullYear();
    let month = dateRaw.getMonth() + 1;
    let dt = dateRaw.getDate();

    Customer.hasMany(Reservation, { foreignKey: 'customer_id' })
    Reservation.belongsTo(Customer, { foreignKey: 'customer_id' })

    Reservation.hasMany(Bill, { foreignKey: "reservation_reservation_id" })
    Bill.belongsTo(Reservation, { foreignKey: "reservation_reservation_id" })

    SubService.hasOne(Reservation, { foreignKey: 'sub_service_sub_service_id' })
    Reservation.belongsTo(SubService, { foreignKey: 'sub_service_sub_service_id' })
    Bill.findAll({
        include: [{
            model: Reservation,
            include: [
                { model: Customer },
                {
                    model: SubService
                }
            ]
        }],
        where: {
            year: year,
            month: month,
        },
        order: [
            ['date', 'DESC'],
        ],
    })
        .then(data => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Bill.",
            });
        })
}
