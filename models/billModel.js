module.exports = (sequelize, Sequelize, DataTypes) => {
    const Bill = sequelize.define("bill", {
        bill_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        total_money: {
            type: Sequelize.FLOAT
        },
        date: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.TINYINT
        },
        payment_method_payment_method_id: {
            type: Sequelize.TINYINT
        },
        sub_service_sub_service_id: {
            type: Sequelize.TINYINT
        },
        reservation_reservation_id: {
            type: Sequelize.TINYINT
        },
        time: {
            type: Sequelize.TIME
        }
    }, {
        sequelize,
        tableName: 'bill',
        timestamps: false
    });

    return Bill;
};