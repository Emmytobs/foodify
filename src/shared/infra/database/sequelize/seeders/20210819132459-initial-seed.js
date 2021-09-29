'use strict';

const { getUsersSeedData } = require('.')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createUserSeed = () => queryInterface.bulkInsert('users', getUsersSeedData())

    return Promise.all([
      createUserSeed(),
    ])
  },

  down: async (queryInterface, Sequelize) => {
     const deleteUserSeed = () => queryInterface.bulkDelete('users')

     return Promise.all([
      deleteUserSeed()
     ])
  }
};
