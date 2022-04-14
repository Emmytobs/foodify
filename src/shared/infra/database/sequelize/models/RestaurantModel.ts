import { Sequelize, Model, Optional, DataTypes } from "sequelize";
import { sequelize } from ".";
import { FoodModel } from "./FoodModel";

export interface RestaurantAttr {
    restaurantId: string
    userId: string
    vendorId: string
    name: string
    address: string
    city: string
    rating?: number
    verificationStatus: string
    isActive: boolean
    isVerified: boolean
    hasFoodListings: boolean
}

interface RestaurantCreationAttr extends Optional<RestaurantAttr, 'restaurantId'> {}

export class RestaurantModel extends Model<RestaurantCreationAttr, RestaurantAttr> {

}

RestaurantModel.init(
    {
        restaurantId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        vendorId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
        },
        verificationStatus: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        hasFoodListings: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
    },
    {
        sequelize,
        tableName: 'restaurants'
    }
)

RestaurantModel.hasMany(FoodModel, { foreignKey: 'restaurantId', as: 'food' })