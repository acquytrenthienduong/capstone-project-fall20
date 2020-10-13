module.exports = (sequelize, Sequelize, DataTypes) => {
    const WorkingTime = sequelize.define("working_time", {
        working_time_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        start_time: {
            type: Sequelize.DATE
        }
    }, {
        sequelize,
        tableName: 'working_time',
        timestamps: false
    });

    return WorkingTime;
};