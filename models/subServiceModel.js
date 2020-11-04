module.exports = (sequelize, Sequelize, DataTypes) => {
    const SubService = sequelize.define("sub_service", {
        sub_service_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        time: {
            type: Sequelize.TINYINT
        },
        money: {
            type: Sequelize.TINYINT
        },
        type: {
            type: Sequelize.TINYINT
        },
        service_service_id: {
            type: Sequelize.TINYINT
        },
        session: {
            type: Sequelize.TINYINT
        }
    }, {
        sequelize,
        tableName: 'sub_service',
        timestamps: false
    });

    return SubService;
};