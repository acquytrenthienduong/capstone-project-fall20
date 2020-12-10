const db = require("../models/index");
const SubService = db.subservice;

exports.findByType = (req, res) => {
    const type = req.params.type
    SubService.findAll({
        where: {
            type: type
        }
    })
        .then(data => {
            // console.log("data", data)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "can not find"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id
    SubService.findOne({
        where: {
            sub_service_id: id
        }
    })
        .then(data => {
            // console.log("data", data)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "can not find"
            });
        });
};