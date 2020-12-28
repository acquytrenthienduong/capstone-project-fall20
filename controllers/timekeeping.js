const db = require("../models/index");
const Timekeeping = db.timekeeping;
const Staff = db.staff;
const Shift = db.shift;
// get all time
exports.findAll = (req, res) => {
    Staff.hasMany(Timekeeping, { foreignKey: 'staff_staff_id' })
    Timekeeping.belongsTo(Staff, { foreignKey: 'staff_staff_id' })

    Shift.hasMany(Staff, { foreignKey: 'shift_shift_id' })
    Staff.belongsTo(Shift, { foreignKey: 'shift_shift_id' })

    Timekeeping.findAll({
        include: [
            {
                model: Staff,
                include: [
                    Shift
                ]
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};