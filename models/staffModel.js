module.exports = (sequelize, Sequelize, DataTypes) => {
    const Staff = sequelize.define("staff", {
        staff_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        dob: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.TINYINT
        },
        shift_shift_id: {
            type: Sequelize.TINYINT
        },
        salaryUnit: {
            type: Sequelize.FLOAT
        },
        name: {
            type: Sequelize.STRING
        }
    }, {
        sequelize,
        tableName: 'staff',
        timestamps: false
    });

    return Staff;
};