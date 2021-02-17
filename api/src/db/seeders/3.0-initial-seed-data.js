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
            "CommStatuses",
            [
                {
                    displayName: "Intiated",
                    description: "The initial call to action",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    displayName: "Request",
                    description:
                        "The mailer service has accepted the initial request and will send to mailer",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    displayName: "Pending",
                    description:
                        "The mailer service returns response is pending",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    displayName: "Success",
                    description:
                        "The mailer service was able to send communication successfully",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    displayName: "Failure",
                    description:
                        "The mailer service was not able to send communication successfully",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
            ],
            {}
        );

        await queryInterface.bulkInsert(
            "CommTypes",
            [
                {
                    displayName: "Login",
                    description: "Login related request",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    displayName: "Work",
                    description: "Work related request",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    displayName: "Space",
                    description: "Space related request",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    displayName: "Payment",
                    description: "Payment related request",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    displayName: "Donation",
                    description: "Donation related request",
                    active: true,
                    createdById: 2,
                    updatedById: 2,
                },
            ],
            {}
        );

        await queryInterface.bulkInsert(
            "Comms",
            [
                {
                    displayName: "Registration Verification",
                    description: "Send registration verification email",
                    active: true,
                    commTypeId: 1,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    displayName: "Change Password",
                    description: "Change password email",
                    active: true,
                    commTypeId: 1,
                    createdById: 2,
                    updatedById: 2,
                },
                {
                    displayName: "Forgot Password",
                    description: "Change password email",
                    active: true,
                    commTypeId: 1,
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
        await queryInterface.bulkDelete("CommStatuses", null, {
            truncate: true,
            cascade: true,
        });

        await queryInterface.bulkDelete("CommTypes", null, {
            truncate: true,
            cascade: true,
        });

        await queryInterface.bulkDelete("Comms", null, {
            truncate: true,
            cascade: true,
        });
    },
};
