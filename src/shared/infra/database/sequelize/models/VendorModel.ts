import { Optional, Model, DataTypes } from "sequelize";
import { sequelize } from ".";

export interface VendorAttr {
    vendorId: string
    userId: string
}

interface VendorCreationAttr extends Optional<VendorAttr, 'vendorId'> {}

export class VendorModel extends Model<VendorCreationAttr, VendorAttr> {}

VendorModel.init({
    vendorId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'vendors'
})

