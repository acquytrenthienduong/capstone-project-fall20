module.exports = (sequelize, Sequelize, DataTypes) => {
    const FeedBack = sequelize.define("feedback", {
        feedback_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        customer_id: {
            type: Sequelize.TINYINT
        },
        service_id: {
            type: Sequelize.TINYINT
        },
        content: {
            type: Sequelize.STRING
        },
        service_service_id: {
            type: Sequelize.TINYINT
        }
    }, {
        sequelize,
        tableName: 'feedback',
        timestamps: false
    });

    return FeedBack;
};