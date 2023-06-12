'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Course', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastUnitArrangement: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      lastRevisionArrangement: {
        type: Sequelize.INTEGER(3),
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addColumn('Course', 'gradeId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Grade',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });


    await queryInterface.addColumn('Grade', 'currentCourseId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Course',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Course', 'gradeId');
    await queryInterface.removeColumn('Grade', 'currentCourseId');
    await queryInterface.dropTable('Course');
  },
};
