module.exports = (sequelize, Sequelize, DataTypes) => {
    const Reservation = sequelize.define("reservation", {
        reservations_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        customer_id: {
            type: Sequelize.STRING
        },
        reservation_detail_id: {
            type: Sequelize.DATE
        },
        bill_bill_id: {
            type: Sequelize.TINYINT
        },
        receptionist_id: {
            type: Sequelize.TINYINT
        },
        receptionist_receptionist_id: {
            type: Sequelize.TINYINT
        }
    }, {
        sequelize,
        tableName: 'reservation',
        timestamps: false
    });

    return Reservation;
};