"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("files", "type", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removerColumn("files", "type");
  },
};
