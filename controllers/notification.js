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

exports.findAllNotificationForManager = (req, res) => {
    Notification.findAll({
        where: {
            notification_type: 0
        }
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

exports.seenNoti = (req, res) => {
    const id = req.params.id;
    // console.log('req.body', req.body);
    Notification.update(req.body.noti, {
        where: { notification_id: id }
    })
        .then(num => {
            console.log(num);
            if (num == 1) {
                res.send({
                    message: "Notification was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Notification with id=${id}. Maybe Notification was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Reservation with id=" + id
            });
        });
}