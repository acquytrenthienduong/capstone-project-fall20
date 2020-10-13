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
        time: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.TINYINT
        },
        payment_method_payment_method_id: {
            type: Sequelize.TINYINT
        },
        service_service_id: {
            type: Sequelize.TINYINT
        }
    }, {
        sequelize,
        tableName: 'bill',
        timestamps: false
    });

    return Bill;
};