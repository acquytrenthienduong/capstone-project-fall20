const db = require("../models/index");
const Activity = db.historyactivity;
const Op = db.Sequelize.Op;
const passport = require('passport');

exports.create = (req, res) => {

    // Create a Tutorial
    const activity = {
        content: req.body.content,
    };
    // Save Tutorial in the database
    Activity.create(activity)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the activity."
            });
        });
};


exports.findAll = (req, res) => {
    Activity.findAll({})
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