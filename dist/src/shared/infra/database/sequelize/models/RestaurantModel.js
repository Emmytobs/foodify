"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantModel = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
const FoodModel_1 = require("./FoodModel");
class RestaurantModel extends sequelize_1.Model {
}
exports.RestaurantModel = RestaurantModel;
RestaurantModel.init({
    restaurantId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    vendorId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    verificationStatus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    sequelize: _1.sequelize,
    tableName: 'restaurants'
});
RestaurantModel.hasMany(FoodModel_1.FoodModel, { foreignKey: 'restaurantId', as: 'food' });
