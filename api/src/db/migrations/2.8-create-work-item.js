"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("WorkItems", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            spaceWorkId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "SpaceWorks",
                    key: "id",
                },
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            workStateId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "WorkStates",
                    key: "id",
                },
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
        await queryInterface.dropTable("WorkItems");
    },
};
