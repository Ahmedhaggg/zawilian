'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TYPE "term_values" AS ENUM ('first', 'second');

      ALTER TABLE "Course"
      ADD COLUMN "term" "term_values" NOT NULL DEFAULT 'first';
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE "Course"
      DROP COLUMN "term";

      DROP TYPE "term_values";
    `);
  }
};
