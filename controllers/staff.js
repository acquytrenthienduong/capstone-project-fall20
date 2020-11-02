const db = require("../models/index");
const Staff = db.staff;
const Shift = db.shift;
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
    // join Shift and staff table, as staff id is main
    Shift.hasMany(Staff, { foreignKey: 'shift_shift_id' })
    Staff.belongsTo(Shift, { foreignKey: 'shift_shift_id' })

    Staff.findAll({ include: [Shift] })
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

// Find a single staff with an id
exports.findOne = (req, res) => {
    Shift.hasMany(Staff, { foreignKey: 'shift_shift_id' })
    Staff.belongsTo(Shift, { foreignKey: 'shift_shift_id' })
    const id = req.params.staff_id;

    Staff.findByPk(id, { include: [Shift] })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving staff with id=" + id,
            });
        });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Staff.destroy({
        where: { staff_id: id },
    })
        .then((data) => {
            console.log("data", data);
            if (data == 1) {
                res.status(200).send({
                    message: "delete success",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial.",
            });
        });
};
