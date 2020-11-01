const db = require("../models/index");
const Receptionist = db.receptionist;
const Op = db.Sequelize.Op;
const passport = require('passport');

exports.create = (req, res) => {
    // Validate request
    // if (!req.body.account) {
    //     res.status(400).send({
    //         message: "account can not be empty!"
    //     });
    //     return;
    // }

    // Create a Tutorial
    const receptionist = {
        account: req.body.account,
        password: req.body.password,
        dob: req.body.dob,
        shift_shift_id: req.body.shift_shift_id
    };

    // Save Tutorial in the database
    Receptionist.create(receptionist)
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

exports.update = (req, res) => {
    console.log('req.params.receptionist_id', req.params.id)
    const id = req.params.id;

    Receptionist.update(req.body, {
        where: { receptionist_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Receptionist was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Receptionist with id=${id}. Maybe Customer was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Receptionist with id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    Receptionist.findAll(res.body)
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
exports.findOne = (req, res) => {
    const id = req.params.id;

    Receptionist.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Receptionist with id=" + id,
            });
        });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Receptionist.destroy({
        where: { receptionist_id: id },
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