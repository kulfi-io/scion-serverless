"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("SpaceWorks", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            spaceId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Spaces",
                    key: "id",
                },
            },
            workId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Works",
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
            modifiedById: {
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
        await queryInterface.dropTable("SpaceWorks");
    },
};
