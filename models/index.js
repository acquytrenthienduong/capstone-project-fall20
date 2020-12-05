const dbConfig = require("../config_local");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};

const sequelize = new Sequelize('navatan', 'root', 'quangdaicA1@', {
    host: process.env.HOST,
    dialect: 'mysql',
    operatorsAliases: operatorsAliases,
    pool: {
        max: 5,
        min: 0,
        acquire: process.env.ACQUIRE,
        idle: process.env.IDLE
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.product = require("./productModel")(sequelize, Sequelize);
db.customer = require("./customerModel")(sequelize, Sequelize);
db.manager = require("./managerModel")(sequelize, Sequelize);
db.feedback = require("./feedbackModel")(sequelize, Sequelize);
db.notification = require("./notificationModel")(sequelize, Sequelize);
db.workingtime = require("./workingTimeModel")(sequelize, Sequelize);
db.bill = require("./billModel")(sequelize, Sequelize);
db.shift = require("./shiftModel")(sequelize, Sequelize);
db.staff = require("./staffModel")(sequelize, Sequelize);
db.subservice = require("./subServiceModel")(sequelize, Sequelize);
db.reservationdetail = require("./reservationDetailModel")(sequelize, Sequelize);
db.reservation = require("./reservationModel")(sequelize, Sequelize);
db.receptionist = require("./receptionistModel")(sequelize, Sequelize);
db.admin = require("./adminModel")(sequelize, Sequelize);
db.timekeeping = require("./timekeepingModel")(sequelize, Sequelize);
db.historyactivity = require("./historyActivityModel")(sequelize, Sequelize);

module.exports = db;