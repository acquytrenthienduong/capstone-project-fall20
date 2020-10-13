const dbConfig = require("../config/dbconfig");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

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

module.exports = db;