"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    up: (queryInterface, Sequelize) => {
        const createUser = () => {
            return queryInterface.createTable('users', {
                userId: {
                    type: Sequelize.DataTypes.UUID,
                    primaryKey: true,
                    defaultValue: Sequelize.DataTypes.UUIDV4,
                    allowNull: false
                },
                firstname: Sequelize.DataTypes.STRING,
                lastname: Sequelize.DataTypes.STRING,
                username: Sequelize.DataTypes.STRING,
                roles: {
                    type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
                    allowNull: false
                },
                email: {
                    type: Sequelize.DataTypes.STRING(250),
                    allowNull: false
                },
                password: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false
                },
                is_email_verified: {
                    type: Sequelize.DataTypes.BOOLEAN,
                    defaultValue: false,
                    allowNull: false,
                },
                lastLogin: {
                    type: Sequelize.DataTypes.DATE,
                    defaultValue: Sequelize.DataTypes.NOW,
                    allowNull: false,
                },
                createdAt: {
                    type: Sequelize.DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.DataTypes.NOW
                },
                updatedAt: {
                    type: Sequelize.DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.DataTypes.NOW
                }
            });
        };
        const createVendor = () => {
            return queryInterface.createTable('vendors', {
                vendorId: {
                    type: Sequelize.DataTypes.UUID,
                    primaryKey: true,
                    defaultValue: Sequelize.DataTypes.UUIDV4,
                    allowNull: false
                },
                userId: {
                    type: Sequelize.DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'userId'
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                },
                createdAt: {
                    type: Sequelize.DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.DataTypes.NOW
                },
                updatedAt: {
                    type: Sequelize.DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.DataTypes.NOW
                }
            });
        };
        const createRestaurant = () => {
            return queryInterface.createTable('restaurants', {
                restaurantId: {
                    type: Sequelize.DataTypes.UUID,
                    defaultValue: Sequelize.DataTypes.UUIDV4,
                    allowNull: false
                },
                userId: {
                    type: Sequelize.DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'userId'
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                },
                vendorId: {
                    type: Sequelize.DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'vendors',
                        key: 'vendorId'
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                },
                rating: {
                    type: Sequelize.DataTypes.INTEGER,
                },
                verificationStatus: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false
                },
                isActive: {
                    type: Sequelize.DataTypes.BOOLEAN,
                    defaultValue: false,
                    allowNull: false
                },
                isVerified: {
                    type: Sequelize.DataTypes.BOOLEAN,
                    defaultValue: false,
                    allowNull: false
                },
                createdAt: {
                    type: Sequelize.DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.DataTypes.NOW
                },
                updatedAt: {
                    type: Sequelize.DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.DataTypes.NOW
                }
            });
        };
        const createFood = () => {
            return queryInterface.createTable("food", {
                foodId: {
                    type: Sequelize.DataTypes.UUID,
                    defaultValue: Sequelize.DataTypes.UUIDV4,
                    primaryKey: true,
                    allowNull: false
                },
                restaurantId: {
                    type: Sequelize.DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'restaurants',
                        key: 'restaurantId'
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade',
                },
                rating: Sequelize.DataTypes.INTEGER,
                name: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false
                },
                description: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false
                },
                price: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false
                },
                image: {
                    type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
                    allowNull: false
                },
                discountedPrice: Sequelize.DataTypes.INTEGER,
                createdAt: {
                    type: Sequelize.DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.DataTypes.NOW
                },
                updatedAt: {
                    type: Sequelize.DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.DataTypes.NOW
                }
            });
        };
        // Use Promise.all to run everything
        return Promise.all([
            createUser(),
            // createVendor(),
            // createRestaurant(),
            // createFood()
        ]);
    },
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        const dropUser = () => queryInterface.dropTable('users');
        return Promise.all([
            dropUser()
        ]);
    })
};
