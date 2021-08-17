import { DataTypes, Optional, Model, Association } from 'sequelize';
import { sequelize } from '.';

export interface UserModelAttr {
    userId: string
    roles: string[]
    email: string;
    password: string;
    is_email_verified: boolean;
    lastLogin: Date
    firstname?: string
    lastname?: string
    username?: string;
}

interface UserModelCreationAttr extends Optional<UserModelAttr, 'userId'>{}

export class UserModel extends Model<UserModelAttr, UserModelCreationAttr> {
    static associations: {
        projects:  Association
    }
}

UserModel.init({
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    roles: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
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
        allowNull: false,
    },
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    }
}, {
    sequelize,
    tableName: 'users'
})