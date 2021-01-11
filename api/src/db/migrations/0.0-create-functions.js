"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createFunction(
            "create_geometryFromText",
            [{ type: "varchar", name: "data", direction: "in" }],
            "public.geometry",
            "plpgsql",
            "Return(SELECT public.ST_GeomFromText(data, 4326));",
            ["IMMUTABLE"]
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropFunction("create_geometryFromText", [
            { type: "varchar", name: "data", direction: "in" },
        ]);
    },
};
