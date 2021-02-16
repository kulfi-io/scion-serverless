"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Works", {
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
            rate: {
                type: Sequelize.FLOAT,
                defaultValue: 0.0,
            },
            workStatusId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "WorkStatuses",
                    key: "id",
                },
            },
            workTypeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "WorkTypes",
                    key: "id",
                },
            },
            workCategoryId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "WorkCategories",
                    key: "id",
                },
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
        await queryInterface.dropTable("Works");
    },
};
