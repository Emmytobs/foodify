"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
const VendorModel_1 = require("./VendorModel");
class UserModel extends sequelize_1.Model {
}
exports.UserModel = UserModel;
UserModel.init({
    userId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false
    },
    firstname: sequelize_1.DataTypes.STRING,
    lastname: sequelize_1.DataTypes.STRING,
    username: sequelize_1.DataTypes.STRING,
    roles: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    is_email_verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    lastLogin: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    sequelize: _1.sequelize,
    tableName: 'users'
});
UserModel.hasOne(VendorModel_1.VendorModel, { as: 'vendor', foreignKey: 'userId' });
