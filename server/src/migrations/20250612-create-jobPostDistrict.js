"use strict";
/** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("job_post_districts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      job_post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "job_posts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      district_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "districts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addIndex("job_post_districts", ["job_post_id"]);
    await queryInterface.addIndex("job_post_districts", ["district_id"]);
    await queryInterface.addConstraint("job_post_districts", {
      fields: ["job_post_id", "district_id"],
      type: "unique",
      name: "job_post_districts_unique",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("job_post_districts");
  },
};
