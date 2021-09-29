"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorModel = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
class VendorModel extends sequelize_1.Model {
}
exports.VendorModel = VendorModel;
VendorModel.init({
    vendorId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    }
}, {
    sequelize: _1.sequelize,
    tableName: 'vendors'
});
