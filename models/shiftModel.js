module.exports = (sequelize, Sequelize, DataTypes) => {
    const Shift = sequelize.define("shift", {
        shift_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        shift_name: {
            type: Sequelize.STRING
        },
        start_time: {
            type: Sequelize.DATE
        },
        end_time: {
            type: Sequelize.DATE
        }
    }, {
        sequelize,
        tableName: 'shift',
        timestamps: false
    });

    return Shift;
};