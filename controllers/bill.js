const db = require("../models/index");
const Bill = db.bill;

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
    };

    Bill.findAll({
        where: { reservation_reservation_id: bill.reservation_reservation_id }
    })
        .then(data => {
            if (data.length > 0) {
                res.status(201).send({ msg: "bill da dc tao" })
            }
            else {
                Bill.create(bill)
                    .then((data) => {
                        console.log('data', data);
                        res.send(data);
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Tutorial.",
                        });
                    });
            }
        })
};
