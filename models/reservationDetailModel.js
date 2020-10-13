module.exports = (sequelize, Sequelize, DataTypes) => {
    const ReservationDetail = sequelize.define("reservation_detail", {
        reservation_detail_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        checkin_time: {
            type: Sequelize.DATE
        },
        checkout_time: {
            type: Sequelize.DATE
        },
        checkin_status: {
            type: Sequelize.TINYINT
        },
        working_time_working_time_id: {
            type: Sequelize.DATE
        },
        reservation_reservations_id: {
            type: Sequelize.TINYINT
        },
        reservation_date: {
            type: Sequelize.DATE
        }
    }, {
        sequelize,
        tableName: 'reservation_detail',
        timestamps: false
    });

    return ReservationDetail;
};