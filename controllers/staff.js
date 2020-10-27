const db = require("../models/index");
const Staff = db.staff;
const Op = db.Sequelize.Op;
const passport = require('passport');
// const { staff } = require("../models/index");

exports.create = (req, res) => {
    // Validate request
    // if (!req.body.) {
    //     res.status(400).send({
    //         message: "account can not be empty!"
    //     });
    //     return;
    // }

    // Create a Tutorial
    const staff = {
        dob: req.body.dob,
        gender: req.body.gender,
        shift_shift_id: req.body.shift_shift_id
    };

    // Save Tutorial in the database
    Staff.create(staff)
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
exports.findByStaff_id = (req, res) => {
    const staff_id = req.params.staff_id
    if (!req.body.staff_id) {
        res.status(400).send({
            message: " not found"
        });
        return;
    }
    Staff.findAll({
        where: { staff_id: staff_id }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + staff_id
            });
        });
};
exports.findAll = (req, res) => {
    Staff.findAll(res.body)
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
exports.update = (req, res) => {
    const staff_id = req.params.staff_id;

    Staff.update(req.body, {
        where: { staff_id: staff_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Staff was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Staff with id=${id}. Maybe Staff was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Staff with id=" + staff_id
            });
        });
};