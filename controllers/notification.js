const db = require("../models/index");
const Notification = db.notification;
const Op = db.Sequelize.Op;
const passport = require('passport');

exports.create = (req, res) => {
    // Validate request
    if (!req.body.account) {
        res.status(400).send({
            message: "account can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const notification = {
        notification_type: req.body.notification_type,
        content: req.body.content,
        link_action: req.body.link_action,
        customer_customer_id: req.body.customer_customer_id,
        manager_manager_id: req.body.manager_manager_id
    };

    // Save Tutorial in the database
    Notification.create(notification)
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