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
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};