module.exports = (sequelize, Sequelize, DataTypes) => {
    const Service = sequelize.define("service", {
        service_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        service_name: {
            type: Sequelize.STRING
        },
        service_catagory: {
            type: Sequelize.STRING
        }
    }, {
        sequelize,
        tableName: 'service',
        timestamps: false
    });

    return Service;
};