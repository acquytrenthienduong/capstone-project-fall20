const db = require("../../models/index");
const Notification = db.notification;
const Op = db.Sequelize.Op;
const passport = require('passport');

// create notification for custoemr
exports.create = (req, res) => {

    // Create a Notification
    const notification = {
        notification_type: 0,
        content: req.body.content,
        seen: 0
    };

    // Save Notification in the database
    Notification.create(notification)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Notification."
            });
        });
};

// get all notification for customer 
exports.findAllNotificationForCustomer = (req, res) => {
    let id = req.params.id
    Notification.findAll({
        where: {
            notification_type: 1,
            customer_customer_id: id,
            seen: 0
        }
    })
        .then(data => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while getting Notification.",
            });
        })
}

// update notification status
exports.seenNoti = (req, res) => {
    const id = req.params.id;
    Notification.update(req.body.noti, {
        where: { notification_id: id }
    })
        .then(num => {
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
// update one notification
exports.seenOne = (req, res) => {
    const id = req.params.id;
    // let seen = req.body.seen
    Notification.update(req.body.noti, {
        where: { notification_id: id }
    })
        .then(num => {
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