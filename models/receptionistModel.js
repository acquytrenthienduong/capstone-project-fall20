module.exports = (sequelize, Sequelize, DataTypes) => {
    const Receptionist = sequelize.define("receptionist", {
        receptionist_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        account: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        dob: {
            type: Sequelize.STRING
        },
        shift_shift_id: {
            type: Sequelize.TINYINT
        }
    }, {
        sequelize,
        tableName: 'receptionist',
        timestamps: false
    });

    return Receptionist;
};