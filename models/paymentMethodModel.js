module.exports = (sequelize, Sequelize, DataTypes) => {
    const PaymentMethod = sequelize.define("payment_method", {
        payment_method_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        method_name: {
            type: Sequelize.STRING
        }
    }, {
        sequelize,
        tableName: 'payment_method',
        timestamps: false
    });

    return PaymentMethod;
};