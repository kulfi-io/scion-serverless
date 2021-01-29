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
                    createdById: 1,
                    updatedById: 1,
                },
            ],
            {}
        );
        // Space User Roles join table
        await queryInterface.bulkInsert(
            "SpaceUserRoles",
            [
                {
                    spaceId: 1,
                    userRoleId: 1,
                    createdById: 1,
                    updatedById: 1,
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

        await queryInterface.bulkDelete("SpaceUserRoles", null, {
            truncate: true,
            cascade: true,
        });
    },
};
