const db = require("../models/index");
const Activity = db.historyactivity;
const Op = db.Sequelize.Op;
const passport = require('passport');

// create activity
exports.create = (req, res) => {

    // Create a Activity
    const activity = {
        content: req.body.content,
    };
    // Save Activity in the database
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

// get all activity
exports.findAll = (req, res) => {
    Activity.findAll({
        order: [
            ['history_activity_id', 'DESC'],
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