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
        receptionist_id: {
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
        sub_service_sub_service_id: {
            type: Sequelize.TINYINT
        },
        is_access: {
            type: Sequelize.TINYINT
        },
        year: {
            type: Sequelize.BIGINT
        },
        month: {
            type: Sequelize.BIGINT
        },
        day: {
            type: Sequelize.BIGINT
        }
    }, {
        sequelize,
        tableName: 'reservation',
        timestamps: false
    });

    return Reservation;
};