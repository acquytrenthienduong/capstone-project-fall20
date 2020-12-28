const db = require("../models/index");
const Receptionist = db.receptionist;
const Shift = db.shift;
const Op = db.Sequelize.Op;
const passport = require('passport');
const { shift } = require("../models/index");
// create Receptionist
exports.create = (req, res) => {
    // Validate request
    if (!req.body.account) {
        res.status(400).send({
            message: "account can not be empty!"
        });
        return;
    }

    // Create a Receptionist
    const receptionist = {
        account: req.body.account,
        password: req.body.password,
        dob: req.body.dob,
        shift_shift_id: 1
    };

    // Save Receptionist in the database
    Receptionist.findAll({
        where : {
            account: receptionist.account}
    })

        .then(data => {
            if(data.length > 0){
                res.status(201).send({ msg: "account exits" })
            }
            else{
                Receptionist.create(receptionist)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Receptionist."
                    });
                });
            }
        })
};
// update information of Receptionist
exports.update = (req, res) => {
    const id = req.params.id;

    Receptionist.update(req.body, {
        where: { receptionist_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Receptionist was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Receptionist with id=${id}. Maybe Customer was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Receptionist with id=" + id
            });
        });
};

// get all Receptionist
exports.findAll = (req, res) => {
    Shift.hasMany(Receptionist, { foreignKey: 'shift_shift_id' })
    Receptionist.belongsTo(Shift, { foreignKey: 'shift_shift_id' })

    Receptionist.findAll({ include: [Shift] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving receptionist."
            });
        });
};

// get one Receptionist
exports.findOne = (req, res) => {
    Shift.hasMany(Receptionist, { foreignKey: 'shift_shift_id' })
    Receptionist.belongsTo(Shift, { foreignKey: 'shift_shift_id' })
    const id = req.params.id;

    Receptionist.findByPk(id, { include: [Shift] })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Receptionist with id=" + id,
            });
        });
};
// Delete a Receptionist with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Receptionist.destroy({
        where: { receptionist_id: id },
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
                message:
                    err.message || "Some error occurred while delete the Tutorial.",
            });
        });
};

// get login status
exports.getLogin = (req, res) => {
    if (req.user instanceof Receptionist) {
        res.status(200).send({ msg: "da dang nhap role Receptionist" });
    } else {
        res.status(500).send({ msg: "chua dang nhap" });
    }
};

// login for receptionist
exports.postLogin = (req, res, next) => {
    const validationErrors = [];
    if (!req.body.username) {
        validationErrors.push({ mes: "empty username" });
    }

    if (!req.body.password) {
        validationErrors.push({ mes: "empty password" });
    }

    passport.authenticate("receptionist-local", (err, receptionist, info) => {
        if (err) {
            return next(err);
        }
        if (!receptionist) {
            // req.flash("errors", info);
            // return res.status(500).send({ msg: "login fail" })
            return res.redirect("/login");
        }
        req.logIn(receptionist, (err) => {
            if (err) {
                return next(err);
            }
            //req.flash("success", { msg: "Success! You are logged in." });
            // console.log('(req.session.returnTo', req.session.returnTo)
            // res.redirect(req.session.returnTo || "/");
            res.status(200).send(receptionist)
        });
    })(req, res, next);
};

// logout for receptionist
exports.logout = (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err)
            console.log("Error : Failed to destroy the session during logout.", err);
        req.account = null;
        res.status(200).send({ msg: "longout success" });
    });
};