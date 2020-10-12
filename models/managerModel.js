module.exports = (sequelize, Sequelize, DataTypes) => {
    const Manager = sequelize.define("manager", {
        manager_id: {
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
        dob: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.TINYINT
        }
    }, {
        sequelize,
        tableName: 'manager',
        timestamps: false
    });

    return Manager;
};