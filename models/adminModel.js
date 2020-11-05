module.exports = (sequelize, Sequelize, DataTypes) => {
    const Admin = sequelize.define("admin", {
        admin_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING
        },
    }, {
        sequelize,
        tableName: 'admin',
        timestamps: false
    });

    return Admin;
};