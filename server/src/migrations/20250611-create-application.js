"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("applications", {
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
      file_cv: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("pending", "reviewed", "accepted", "rejected"),
        allowNull: false,
        defaultValue: "pending",
      },
      note: {
        type: Sequelize.TEXT,
        allowNull: true,
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

    await queryInterface.addIndex("applications", ["user_id"]);
    await queryInterface.addIndex("applications", ["job_post_id"]);
    await queryInterface.addIndex("applications", ["status"]);
    await queryInterface.addConstraint("applications", {
      fields: ["user_id", "job_post_id"],
      type: "unique",
      name: "applications_user_jobpost_unique",
    });
  },

 async down (queryInterface , Sequelize) {
    await queryInterface.dropTable("applications");
  },
};
