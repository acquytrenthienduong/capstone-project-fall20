const db = require("../models/index");
const Product = db.product;
// const op = db.Sequelize.Op;
// const passport = require("passport");

// create a product
exports.addProduct = (req, res) => {
  const product = new Product({
    productName: req.body.productName,
    img_url: req.file.path,
    sub_service_sub_service_id: req.body.sub_service_sub_service_id,
  });
  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Created product successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  Product.findAll()
  .then((data) => {
      res.send(data);
  })
  .catch((err) => {
      res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving products.",
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
      if (data == 1) {
        res.status(200).send({
          message: "delete success",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting product.",
      });
    });
};
