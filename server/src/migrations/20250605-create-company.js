"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface , Sequelize)  {
    await queryInterface.createTable("companies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      link_website: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      members: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 0,
      },
      admin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
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

    await queryInterface.addIndex("companies", ["admin_id"]);
  },

  async down (queryInterface, Sequelize ) {
    await queryInterface.dropTable("companies");
  },
};
