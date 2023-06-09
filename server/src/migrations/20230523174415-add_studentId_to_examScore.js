'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn("ExamScore", "studentId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "Student",
        key: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn("ExamScore", "studentId")
  }
};
