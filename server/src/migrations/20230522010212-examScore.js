'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ExamScore', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      courseRevisionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'CourseRevision',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      unitId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Unit',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      sectionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Section',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      score: {
        type: Sequelize.INTEGER(3),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      studentId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Student",
          key: "id"
        },
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ExamScore');
  },
};
