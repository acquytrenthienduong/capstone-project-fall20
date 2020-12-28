const db = require("../../models/index");
const Customer = db.customer;
const Reservation = db.reservation;
const SubService = db.subservice;
const Op = db.Sequelize.Op;
const passport = require('passport');
const moment = require('moment');
const Bill = db.bill;
const bcrypt = require('bcrypt')


// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.account) {
    res.status(400).send({
      message: "account can not be empty!"
    });
    return;
  }

  // Create a Tutorial

  bcrypt.hash(req.body.password.toString(), 10)
    .then((hash) => {
      let customer = {
        account: req.body.account,
        password: hash,
        email: req.body.email,
        gender: req.body.gender,
        createAt: new Date(),
        name: req.body.name,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day
      };

      Customer.create(customer)
        .then(() => {
          res.send({
            message: 'Cảm ơn bạn rất nhiều. 🥰'
          })
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the customer."
          });
        });
    })

  // Save Tutorial in the database

};

// get all customer
exports.findAll = (req, res) => {
  Customer.findAll({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customer."
      });
    });
};
// find all customer incluce input
exports.findAllByAccount = (req, res) => {
  const account = req.params.account
  Customer.findAll({
    where: {
      account: {
        [Op.like]: '%' + account + '%'
      }
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customer."
      });
    });
};
// find customer by Account
exports.SearchCustomerByAccount = (req, res) => {
  const account = req.params.account

  Customer.hasMany(Reservation, { foreignKey: 'customer_id' })
  Reservation.belongsTo(Customer, { foreignKey: 'customer_id' })

  SubService.hasOne(Reservation, { foreignKey: 'sub_service_sub_service_id' })
  Reservation.belongsTo(SubService, { foreignKey: 'sub_service_sub_service_id' })

  Reservation.hasMany(Bill, { foreignKey: 'reservation_reservation_id' })
  Bill.belongsTo(Reservation, { foreignKey: 'reservation_reservation_id' })

  Customer.findAll({
    include: [
      {
        model: Reservation,
        include: [
          {
            model: SubService
          }, {
            model: Bill
          }
        ]
      }
    ],

    where: {
      account: {
        [Op.like]: '%' + account + '%'
      }
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customer."
      });
    });
};

// find customer by id
exports.findOne = (req, res) => {
  const id = req.params.id
  Customer.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving customer with id=" + id
      });
    });
};
// find customer by account
exports.findByAccount = (req, res) => {
  let account = req.params.account
  Customer.findOne({ where: { account: account } })
    .then(data => {
      if (data) {
        res.send(data);
      }
      else {
        res.status(201).send({ msg: "Khong tim thay" })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with account = " + account
      });
    });
};
// find customer by email
exports.findByEmail = (req, res) => {
  let email = req.params.email
  Customer.findOne({ where: { email: email } })
    .then(data => {
      if (data) {
        res.send(data);
      }
      else {
        res.status(201).send({ msg: "Khong tim thay" })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with account = " + email
      });
    });
};

// Update a custoemr by the id in the request
exports.updateById = (req, res) => {
  const id = req.params.id;

  Customer.update(req.body.customer, {
    where: { customer_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Customer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Customer with id=" + id
      });
    });
};
// update password for customer
exports.changePassword = (req, res) => {
  const id = req.params.id;

  Customer.findOne({ where: { customer_id: id } })
    .then(data => {
      if (!data) {
        res.status(401).send({
          message: "not found."
        });
      }

      bcrypt.compare(req.body.oldpassword, data.password)
        .then((valid) => {
          if (!valid) {
            res.status(402).send({
              message: "old password incorrect."
            });
          }
          else {
            bcrypt.hash(req.body.newpassword, 10)
              .then((hash) => {
                data.update({
                  password: hash
                })
                  .then(() => {
                    res.send({
                      message: 'Cập nhật mật khẩu thành công'
                    })
                  })
                  .catch(err => {
                    res.status(500).send({
                      message: "Error updating Customer with id=" + id
                    });
                  });
              })
          }
        })

    })
    .catch(err => {
      return done(err);
    });

};
// reset password for customer
exports.resetPassword = (req, res) => {
  const id = req.params.id;

  Customer.findOne({ where: { customer_id: id } })
    .then(data => {
      if (!data) {
        res.status(401).send({
          message: "not found."
        });
      }

      bcrypt.hash(req.body.newpassword, 10)
        .then((hash) => {
          data.update({
            password: hash
          })
            .then(() => {
              res.send({
                message: 'Cập nhật mật khẩu thành công'
              })
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating Customer with id=" + id
              });
            });
        })

    })
    .catch(err => {
      return done(err);
    });

};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};
// get customer login status
exports.getLogin = (req, res) => {
  if (req.user instanceof Customer) {
    res.status(200).send({ msg: "login succesfully as customer" })
  }
  else {
    res.status(200).send({ msg: "login fail" })
  }
};
// login for customer
exports.postLogin = (req, res, next) => {

  const validationErrors = [];
  if (!req.body.username) {
    validationErrors.push({ mes: "empty username" });
  }

  if (!req.body.password) {
    validationErrors.push({ mes: "empty password" });
  }

  passport.authenticate('customer-local', { session: false }, (err, customer, info) => {

    if (err) { return next(err); }
    if (!customer) {
      req.flash('errors', info);
      return res.status(500).send({ msg: "invalid username or password" })
      // return res.redirect('/login');
    }

    req.logIn(customer, (err) => {
      if (err) { return next(err); }
      req.flash('success', { msg: 'Success! You are logged in.' });
      // res.redirect(req.session.returnTo || '/');
      res.status(200).send(customer)
    });
  })(req, res, next);
}
// logout for customer
exports.logout = (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) console.log('Error : Failed to destroy the session during logout.', err);
    req.account = null;
    res.status(200).send({ msg: "longout success" })
  });
};
// get register in time
exports.findRegisterFromTo = (req, res) => {
  const from = moment(req.params.from);
  const to = moment(req.params.to)
  Customer.findAll({
    where: {
      createAt: {
        [Op.between]: [from, to]
        // [Op.between]: [new Date(from), new Date(to)]
      }
    },
    order: [
      ['createAt', 'ASC'],
    ],
  })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding"
      });
    });
}