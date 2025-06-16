"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("saved_jobs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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

    await queryInterface.addIndex("saved_jobs", ["user_id"]);
    await queryInterface.addIndex("saved_jobs", ["job_post_id"]);
    await queryInterface.addConstraint("saved_jobs", {
      fields: ["user_id", "job_post_id"],
      type: "unique",
      name: "saved_jobs_user_job_post_unique",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("saved_jobs");
  },
};
