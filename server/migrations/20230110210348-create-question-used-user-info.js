'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('QUESTION_USED_USER_INFO', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      view: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      done: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      isLike: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      isDislike: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
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
    return queryInterface.dropTable('QUESTION_USED_USER_INFO');
  },
};
