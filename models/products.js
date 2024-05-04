const Sequelize = require('sequelize');

const db = require('../util/database');

const Product = db.define(
    'products', {
        product_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        product_name: {
            type: Sequelize.STRING(75),
            allowNull: false
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(255)
        },
        product_type: {
            type: Sequelize.ENUM('0', '1'),
            allowNull: false,
            defaultValue: '0',
            comment: "0 => Print Product, 1 => Promotional Product"
        },
        product_image: {
            type: Sequelize.STRING(155)
        }
    },
    {
        timestamps: false
    }
);
module.exports = Product;