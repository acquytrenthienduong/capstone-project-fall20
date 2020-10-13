module.exports = (sequelize, Sequelize, DataTypes) => {
    const Report = sequelize.define("report", {
        report_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        export_type: {
            type: Sequelize.STRING
        },
        time: {
            type: Sequelize.DATE
        },
        manager_manager_id: {
            type: Sequelize.TINYINT
        }
    }, {
        sequelize,
        tableName: 'report',
        timestamps: false
    });

    return Report;
};