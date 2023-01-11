'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('USERS', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      emailVerify: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      description: Sequelize.TEXT,
      avatar: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      followers: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      dislikes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      location: Sequelize.STRING(300),
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        ),
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('USERS');
  },
};
