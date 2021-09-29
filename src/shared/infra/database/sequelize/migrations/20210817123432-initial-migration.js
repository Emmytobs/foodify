
module.exports = {
  up: async (queryInterface, Sequelize) => {
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
      })
    }

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
      })
    }

    const createRestaurant = () => {
      return queryInterface.createTable('restaurants', {
        restaurantId: {
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
        name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        },
        address: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
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
    }

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
      })
    }

    const vendorSignupRequest = () => {
      return queryInterface.createTable('vendor_signup_requests', {
        vendorSignupRequestId: {
          type: Sequelize.DataTypes.UUID,
          primaryKey: true,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          allowNull: false
        },
        vendorFirstname: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        vendorLastname: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        vendorEmail: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        restaurantName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        restaurantAddress: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        restaurantCity: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        vendorVerificationStatus: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        }
      })
    }

    // const runner = require("../runner");
    // return runner.run([
    //   createUser,
    //   createVendor,
    //   createRestaurant,
    //   createFood
    // ])
    // return Promise.all([
      await createUser()
      await createVendor()
      await createRestaurant()
      await createFood()
      await vendorSignupRequest()
  },

  down: async (queryInterface) => {
    const dropUser = () => queryInterface.dropTable('users');
    const dropVendors = () => queryInterface.dropTable('vendors');
    const dropRestaurants = () => queryInterface.dropTable('restaurants');
    const dropFood = () => queryInterface.dropTable('food');
    const dropVendorSignupRequest = () => queryInterface.dropTable('vendor_signup_requests');

    // return Promise.all([
    // ])
    await dropUser()
    await dropVendors()
    await dropRestaurants()
    await dropFood()
    await dropVendorSignupRequest()
  }
};
