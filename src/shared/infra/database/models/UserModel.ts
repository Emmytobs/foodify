import { DataTypes, Optional, Model } from 'sequelize';

interface UserModelAttr {
    userId: string
    firstname: string
    lastname: string
    email: string;
    password: string;
    is_email_verified: boolean;
}

interface UserModelCreationAttr extends Optional<UserModelAttr, 'userId'>{}

export class UserModel extends Model<UserModelAttr, UserModelCreationAttr> {
}

UserModel.init({
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    // sequelize
})