import { Sequelize, Model, Optional, DataTypes } from "sequelize";
import { sequelize } from ".";

export interface FoodAttr {
    foodId: string
    rating: number
    restaurantId: string
    name: string
    description: string
    price: number
    image: string[]
    discountedPrice?: number
}

interface FoodCreationAttr extends Optional<FoodAttr, 'foodId'> {}

export class FoodModel extends Model<FoodCreationAttr, FoodAttr> {

}

FoodModel.init({
    foodId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    restaurantId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    rating: DataTypes.INTEGER,
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    discountedPrice: DataTypes.INTEGER
}, {
    sequelize,
    tableName: 'food'
})