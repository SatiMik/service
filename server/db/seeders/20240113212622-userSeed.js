'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Генерация хэша пароля
    const hashedPassword = await bcrypt.hash('123', 10);

    await queryInterface.bulkInsert('Users', [
      {
        username: 'user',
        email: 'user@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};