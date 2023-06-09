'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Exam', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      points: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      questions: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
    });

    // await queryInterface.addColumn('Unit', 'examId', {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: 'Exam',
    //     key: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL',
    // });

    // await queryInterface.addColumn('CourseRevision', 'examId', {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: 'Exam',
    //     key: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL',
    // });

    await queryInterface.addColumn('Section', 'examId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Exam',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Unit', 'examId');
    await queryInterface.removeColumn('CourseRevision', 'examId');
    await queryInterface.removeColumn('Section', 'examId');
    await queryInterface.dropTable('Exam');
  },
};
