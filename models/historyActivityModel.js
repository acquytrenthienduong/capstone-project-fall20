module.exports = (sequelize, Sequelize) => {
    const Activity = sequelize.define("history_activity", {
        history_activity_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: Sequelize.STRING
        },
    }, {
        sequelize,
        tableName: 'history_activity',
        timestamps: false
    });

    return Activity;
};