"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodModel = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
class FoodModel extends sequelize_1.Model {
}
exports.FoodModel = FoodModel;
FoodModel.init({
    foodId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    restaurantId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    rating: sequelize_1.DataTypes.INTEGER,
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: false
    },
    discountedPrice: sequelize_1.DataTypes.INTEGER
}, {
    sequelize: _1.sequelize,
    tableName: 'food'
});
