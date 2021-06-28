"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Products", "price", Sequelize.INTEGER);
    await queryInterface.addColumn("Products", "description", Sequelize.STRING);
    await queryInterface.addColumn("Products", "image", Sequelize.STRING);
    await queryInterface.addColumn("Products", "slug", Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Products", "price");
    await queryInterface.removeColumn("Products", "description");
    await queryInterface.removeColumn("Products", "image");
    await queryInterface.removeColumn("Products", "slug");
  },
};
