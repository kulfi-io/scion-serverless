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
         * }], {});
         */
        // User // password = password
        await queryInterface.bulkInsert(
            "Users",
            [
                {
                    firstName: "Admin",
                    lastName: "User",
                    email: "admin@scion.com",
                    password:
                        "$2b$10$Dd556/LUlbWMSOmQWcQ7VeUG46CoEJj7pY/807.F1xfc89hwd1yUW",
                },
                {
                    firstName: "Internal",
                    lastName: "Process",
                    email: "internal@scion.com",
                    password:
                        "$2b$10$Dd556/LUlbWMSOmQWcQ7VeUG46CoEJj7pY/807.F1xfc89hwd1yUW",
                    createdById: 1,
                    updatedById: 1,
                },
            ],
            {}
        );
        // Roles
        await queryInterface.bulkInsert(
            "Roles",
            [
                {
                    name: "Executive Officer",
                    description:
                        "Manages all modules and components across all pool and spaces",
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    name: "Executive Pool Officer",
                    description:
                        "Manages Pool, Payment and Communication for a given Pool",
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    name: "Executive Space Officer",
                    description: "Manages all modules for a given Space",
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    name: "Space Manager",
                    description:
                        "Manages Approval, Communication, Reporting and Access for a given Space",
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    name: "Contractor",
                    description: "Manages Work related items for given space",
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    name: "Doner",
                    description: "Donates to Pools",
                    createdById: 2,
                    updatedById: 2,
                },
            ],
            {}
        );
        // Resources
        await queryInterface.bulkInsert(
            "Resources",
            [
                {
                    name: "Resource",
                    description:
                        "Responsible for managing available components",
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    name: "Financial",
                    description:
                        "Responsible for managing payments and donation related transactions",
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    name: "Work",
                    description: "Responsible for managing work related items",
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    name: "Reporting",
                    description:
                        "Responsible for providing reporting for a given pool or space",
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    name: "Donation",
                    description: "Responsible for manging donation",
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    name: "User",
                    description: "Responsible for managing User access",
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    name: "Space",
                    description: "Responsible for managing sacred spaces",
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    name: "Pool",
                    description: "Responsible for managing pools",
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    name: "Comm",
                    description:
                        "Responsible for managing communications module",
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    name: "Role",
                    description: "Responsible for managing role module",
                    createdById: 2,
                    updatedById: 2,
                },
            ],
            {}
        );
        // Permissions
        await queryInterface.bulkInsert("Permissions", [
            {
                name: "canViewResource",
                createdById: 2,
                updatedById: 2,
            },
            {
                name: "canApprove",
                createdById: 2,
                updatedById: 2,
            },
            {
                name: "canManageSelf",
                createdById: 2,
                updatedById: 2,
            },
            {
                name: "canManage",
                createdById: 2,
                updatedById: 2,
            },
            {
                name: "canManageAccrossAll",
                createdById: 2,
                updatedById: 2,
            },
        ]);
        // space
        await queryInterface.bulkInsert(
            "Spaces",
            [
                {
                    displayName: "Scion",
                    name: "Church of Scion",
                    description: "Church of Scion",
                    location: Sequelize.fn(
                        "create_geometryFromText",
                        "POINT(37.7723 -122.4587)"
                    ),
                    private: false,
                    address: "Some address on McAllister Street",
                    address2: "",
                    city: "San Francisco",
                    state: "CA",
                    zip: "94116",
                    phone: "415-555-1212",
                    cell: "415-555-1212",
                    email: "info@scion.org ",
                    webPresence: "https://scion.org/",
                    verified: true,
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
            ],
            {}
        );

        // User Space Role
        await queryInterface.bulkInsert(
            "UserSpaceRoles",
            [
                {
                    roleId: 1,
                    spaceId: 1,
                    userId: 1,
                    isDefault: true,
                    createdById: 2,
                    updatedById: 2,
                },
            ],
            {}
        );

        // ResourceRole
        // Doner
        // Executive Officer
        await queryInterface.bulkInsert(
            "ResourceRoles",
            [
                {
                    roleId: 6,
                    resourceId: 5,
                    permissionId: 1,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    roleId: 6,
                    resourceId: 6,
                    permissionId: 3,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    roleId: 6,
                    resourceId: 7,
                    permissionId: 1,
                    createdById: 2,
                    updatedById: 2,
                },

                {
                    roleId: 1,
                    resourceId: 1,
                    permissionId: 1,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    roleId: 1,
                    resourceId: 1,
                    permissionId: 5,
                    createdById: 2,
                    updatedById: 2,
                },

                {
                    roleId: 1,
                    resourceId: 2,
                    permissionId: 1,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    roleId: 1,
                    resourceId: 2,
                    permissionId: 5,
                    createdById: 2,
                    updatedById: 2,
                },

                {
                    roleId: 1,
                    resourceId: 3,
                    permissionId: 1,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    roleId: 1,
                    resourceId: 3,
                    permissionId: 5,
                    createdById: 2,
                    updatedById: 2,
                },

                {
                    roleId: 1,
                    resourceId: 3,
                    permissionId: 1,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    roleId: 1,
                    resourceId: 3,
                    permissionId: 5,
                    createdById: 2,
                    updatedById: 2,
                },

                {
                    roleId: 1,
                    resourceId: 4,
                    permissionId: 1,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    roleId: 1,
                    resourceId: 4,
                    permissionId: 5,
                    createdById: 2,
                    updatedById: 2,
                },

                {
                    roleId: 1,
                    resourceId: 5,
                    permissionId: 1,
                    createdById: 2,
                    updatedById: 2,
                },

                {
                    roleId: 1,
                    resourceId: 6,
                    permissionId: 1,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    roleId: 1,
                    resourceId: 6,
                    permissionId: 5,
                    createdById: 2,
                    updatedById: 2,
                },

                {
                    roleId: 1,
                    resourceId: 7,
                    permissionId: 1,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    roleId: 1,
                    resourceId: 7,
                    permissionId: 5,
                    createdById: 2,
                    updatedById: 2,
                },

                {
                    roleId: 1,
                    resourceId: 8,
                    permissionId: 1,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    roleId: 1,
                    resourceId: 8,
                    permissionId: 5,
                    createdById: 2,
                    updatedById: 2,
                },

                {
                    roleId: 1,
                    resourceId: 9,
                    permissionId: 1,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    roleId: 1,
                    resourceId: 9,
                    permissionId: 5,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    roleId: 1,
                    resourceId: 10,
                    permissionId: 5,
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
        await queryInterface.bulkDelete("UserRoles", null, {
            truncate: true,
            cascade: true,
        });

        await queryInterface.bulkDelete("Resources", null, {
            truncate: true,
            cascade: true,
        });

        await queryInterface.bulkDelete("Roles", null, {
            truncate: true,
            cascade: true,
        });

        await queryInterface.bulkDelete("Users", null, {
            truncate: true,
            cascade: true,
        });
    },
};
