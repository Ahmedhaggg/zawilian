'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ExamScore', {
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
      unitRevisionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Section',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      lessonId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Section',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      examId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Exam',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ExamScore');
  },
};
