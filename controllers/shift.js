const db = require("../models/index");
const Shift = db.shift;
const Op = db.Sequelize.Op;
const passport = require("passport");
// create a shift
exports.create = (req, res) => {
  // Validate request
  if (!req.body.shift_name) {
      res.status(400).send({
          message: "account can not be empty!"
      });
      return;
  }

  // Create a Shift
  const shift = {
    shift_name: req.body,
  };

  // Save Shift in the database
  Shift.create(shift)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

// Retrieve all shift from the database.
exports.findAll = (req, res) => {
  Shift.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Shift.",
      });
    });
};


// Find a single Shift with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Shift.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Shift with id=" + id,
            });
        });
};
