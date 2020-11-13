module.exports = (sequelize, Sequelize, DataTypes) => {
    const TimeKeeping = sequelize.define("timekeeping", {
        timekeeping_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        staff_staff_id: {
            type: Sequelize.BIGINT
        },
        date: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.TINYINT
        }
    }, {
        sequelize,
        tableName: 'timekeeping',
        timestamps: false
    });

    return TimeKeeping;
};