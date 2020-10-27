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
    console.log('req.params.receptionist_id', req.params.receptionist_id)
    const id = req.params.receptionist_id;

    Receptionist.update(req.body, {
        where: { manager_id: id }
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