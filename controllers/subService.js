const db = require("../models/index");
const SubService = db.subservice;
const Op = db.Sequelize.Op;


// Find a single service with an id
exports.findOne = (req, res) => {
    const id = req.params.id
    SubService.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving service with id=" + id
        });
      });
  };


// Create and Save a new services
exports.create = (req, res) => {
  console.log("sssssss", req.body);
  // Create a Tutorial
  const service = {
    name: req.body.name,
    time: req.body.time,
    money: req.body.money,
    type: req.body.type,
    service_service_id: req.body.service_service_id,
    session: req.body.session,
  };

  // Save Services in the database
  SubService.create(service)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Services.",
      });
    });
};

// Retrieve all services from the database.
exports.findAll = (req, res) => {
  SubService.findAll({})
    .then((data) => {
      console.log("data", data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving services.",
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  console.log("req.params.id", req.params.id);
  const id = req.params.id;

  SubService.update(req.body, {
    where: { sub_service_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "service was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update service with id=${id}. Maybe service was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating service with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  SubService.destroy({
    where: { sub_service_id: id },
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
        message: err.message || "Some error occurred while delete the service.",
      });
    });
};

exports.findByType = (req, res) => {
  const type = req.params.type;
  SubService.findAll({
    where: {
      type: type,
    },
  })
    .then((data) => {
      // console.log("data", data)
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "can not find",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  SubService.findOne({
    where: {
      sub_service_id: id,
    },
  })
    .then((data) => {
      // console.log("data", data)
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "can not find",
      });
    });
};
