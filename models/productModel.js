module.exports = (sequelize, Sequelize, DataTypes) => {
    const Product = sequelize.define("product", {
        product_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        productName: {
            type: Sequelize.STRING
        },
        img_url: {
            type: Sequelize.STRING
        },
        sub_service_sub_service_id: {
            type: Sequelize.TINYINT
        },
    }, {
        sequelize,
        tableName: 'product',
        timestamps: false
    });

    return Product;
};