'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('QUESTIONS', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: Sequelize.STRING(500),
      commented: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      interviewPosition: Sequelize.BOOLEAN,
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      dislikes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      viewes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    return queryInterface.dropTable('QUESTIONS');
  },
};
