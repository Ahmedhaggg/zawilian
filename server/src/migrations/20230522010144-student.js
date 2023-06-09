'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Student', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      accepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      acceptedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      gradeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Grade',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });

    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Student');
  },
};
