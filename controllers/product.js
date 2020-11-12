const db = require("../models/index");
const Product = db.product;
// const op = db.Sequelize.Op;
// const passport = require("passport");






// create and save a new product
exports.create = (req, res) => {
  console.log("sssssss", req.body);
  // Validate request
  if (!req.body.productName) {
    res.status(400).send({
      message: "account name can not be empty!",
    });
    return;
  }

  // Create a product
  const product = {
    productName: req.body.productName,
    img_url: req.body.img_url,
    sub_service_sub_service_id: req.body.sub_service_sub_service_id,
  };

  // Save product in the database
  Product.create(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  Product.findAll()
    .then((data) => {
      // console.log("data", data)
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products.",
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id,
      });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  console.log("req.params.id", req.params.id);
  const id = req.params.id;

  Product.update(req.body, {
    where: { product_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + id,
      });
    });
};


// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Manager.destroy({
        where: { product_id: id },
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
                message:
                    err.message || "Some error occurred while deleting product.",
            });
        });
};


