import { Optional, Model, DataTypes } from "sequelize";
import { sequelize } from ".";

export interface VendorSignupRequestAttr {
    vendorSignupRequestId: string
    vendorFirstname: string,
    vendorLastname: string,
    vendorEmail: string,
    restaurantName: string,
    restaurantAddress: string,
    restaurantCity: string,
    vendorVerificationStatus: string
}

interface VendorSignupRequestCreationAttr extends Optional<VendorSignupRequestAttr, 'vendorSignupRequestId'> {}

export class VendorSignupRequestModel extends Model<VendorSignupRequestCreationAttr, VendorSignupRequestAttr> {}

VendorSignupRequestModel.init({
    vendorSignupRequestId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    vendorFirstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vendorLastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vendorEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    restaurantName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    restaurantAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    restaurantCity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vendorVerificationStatus: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'vendor_signup_requests'
})

