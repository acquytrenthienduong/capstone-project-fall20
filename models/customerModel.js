module.exports = (sequelize, Sequelize, DataTypes) => {
    const Customer = sequelize.define("customer", {
        customer_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        account: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.TINYINT
        },
        name: {
            type: Sequelize.STRING
        }
    }, {
        sequelize,
        tableName: 'customer',
        timestamps: false
    });

    return Customer;
};