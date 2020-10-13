module.exports = (sequelize, Sequelize, DataTypes) => {
    const Notification = sequelize.define("notification", {
        notification_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        notification_type: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
        link_action: {
            type: Sequelize.STRING
        },
        customer_customer_id: {
            type: Sequelize.TINYINT
        },
        manager_manager_id: {
            type: Sequelize.TINYINT
        }
    }, {
        sequelize,
        tableName: 'notification',
        timestamps: false
    });

    return Notification;
};