'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn("ExamScore", "lessonId");
    await queryInterface.removeColumn("ExamScore", "unitRevisionId");
    await queryInterface.addColumn("ExamScore", "sectionId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Section',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn("ExamScore", "lessonId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Section',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    })
    await queryInterface.addColumn("ExamScore", "unitRevisionId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Section',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    })
    await queryInterface.removeColumn("ExamScore", "sectionId")
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
