module.exports = (sequelize, Sequelize, DataTypes) => {
    const Reservation = sequelize.define("reservation", {
        reservation_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        customer_id: {
            type: Sequelize.STRING
        },
        bill_bill_id: {
            type: Sequelize.TINYINT
        },
        receptionist_id: {
            type: Sequelize.TINYINT
        },
        receptionist_receptionist_id: {
            type: Sequelize.TINYINT
        },
        working_time_working_time_id: {
            type: Sequelize.TINYINT
        },
        checkin_time: {
            type: Sequelize.TIME
        },
        reservation_date: {
            type: Sequelize.DATE
        },
        checkout_time: {
            type: Sequelize.TIME
        },
        status: {
            type: Sequelize.TINYINT
        },
    }, {
        sequelize,
        tableName: 'reservation',
        timestamps: false
    });

    return Reservation;
};