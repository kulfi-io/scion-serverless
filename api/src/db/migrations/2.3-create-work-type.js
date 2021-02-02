"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("WorkTypes", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            displayName: {
                type: Sequelize.STRING,
                unique: true,
            },
            description: {
                type: Sequelize.STRING,
            },
            active: {
                type: Sequelize.BOOLEAN,
            },
            createdById: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            updatedById: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW"),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW"),
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("WorkTypes");
    },
};
