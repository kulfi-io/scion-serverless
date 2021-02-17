"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {}); 37.7723° N 122.4587° W
         */ // Spaces
        //
        await queryInterface.bulkInsert(
            "Spaces",
            [
                {
                    displayName: "Conservatory of Flowers",
                    name: "Conservatory of Flowers, Golden Gate Park",
                    description:
                        "We display exotic flowers and specialized season growth in a greenhouse",
                    location: Sequelize.fn(
                        "create_geometryFromText",
                        "POINT(37.7723 -122.4587)"
                    ),
                    private: false,
                    address: "100 John F. Kennedy Drive",
                    address2: "",
                    city: "San Francisco",
                    state: "CA",
                    zip: "94118",
                    phone: "415-831-2090",
                    cell: "415-831-2090",
                    email: "info@sfcof.org ",
                    webPresence: "https://conservatoryofflowers.org/",
                    verified: true,
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
            ],
            {}
        );

        await queryInterface.bulkInsert(
            "WorkTypes",
            [
                {
                    displayName: "One Time",
                    description: "One time work item",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    displayName: "Recurring",
                    description: "Recurring work item",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
            ],
            {}
        );

        await queryInterface.bulkInsert(
            "WorkCategories",
            [
                {
                    displayName: "Administration",
                    description: "Administrative item",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    displayName: "Maintenance",
                    description: "Maintenance item",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
            ],
            {}
        );

        await queryInterface.bulkInsert(
            "WorkStatuses",
            [
                {
                    displayName: "Approved",
                    description: "Approved for work",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    displayName: "Requested",
                    description: "Requested for approval",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    displayName: "Denied",
                    description: "Denied for approval",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    displayName: "Expired",
                    description: "Expired",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
            ],
            {}
        );

        await queryInterface.bulkInsert(
            "WorkStates",
            [
                {
                    displayName: "In Progress",
                    description: "In Progress",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    displayName: "Pending",
                    description: "Pending",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    displayName: "Completed",
                    description: "Completed",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    displayName: "Scheduled",
                    description: "Scheduled",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    displayName: "Closed",
                    description: "Closed",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    displayName: "Opened",
                    description: "Opened",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
            ],
            {}
        );

        await queryInterface.bulkInsert(
            "Works",
            [
                {
                    displayName: "Pool cleaning",
                    description: "Pool cleaning",
                    rate: 20.0,
                    workStatusId: 2,
                    workTypeId: 1,
                    workCategoryId: 2,
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("Spaces", null, {
            truncate: true,
            cascade: true,
        });

        await queryInterface.bulkDelete("WorkStates", null, {
            truncate: true,
            cascade: true,
        });

        await queryInterface.bulkDelete("WorkStatuses", null, {
            truncate: true,
            cascade: true,
        });

        await queryInterface.bulkDelete("WorkCategories", null, {
            truncate: true,
            cascade: true,
        });

        await queryInterface.bulkDelete("WorkTypes", null, {
            truncate: true,
            cascade: true,
        });

        await queryInterface.bulkDelete("Works", null, {
            truncate: true,
            cascade: true,
        });
    },
};
