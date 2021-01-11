"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Spaces", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            displayName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            location: {
                type: "public.geometry(Point, 4326)",
            },
            private: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            address: {
                type: Sequelize.STRING,
            },
            address2: {
                type: Sequelize.STRING,
            },
            city: {
                type: Sequelize.STRING,
            },
            state: {
                type: Sequelize.STRING,
            },
            zip: {
                type: Sequelize.STRING,
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cellPhone: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            webPresence: {
                type: Sequelize.STRING,
            },
            verified: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
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
        await queryInterface.dropTable("Spaces");
    },
};
