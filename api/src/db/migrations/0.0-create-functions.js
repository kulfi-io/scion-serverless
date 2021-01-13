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

        await queryInterface.createFunction(
            "latitude",
            [{ type: "public.geometry", name: "data", direction: "in" }],
            "double precision",
            "plpgsql",
            "Return(SELECT public.ST_X(data));",
            ["IMMUTABLE"]
        );

        await queryInterface.createFunction(
            "longitude",
            [{ type: "public.geometry", name: "data", direction: "in" }],
            "double precision",
            "plpgsql",
            "Return(SELECT public.ST_Y(data));",
            ["IMMUTABLE"]
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropFunction("create_geometryFromText", [
            { type: "varchar", name: "data", direction: "in" },
        ]);

        await queryInterface.dropFunction("latitude", [
            { type: "public.geometry", name: "data", direction: "in" },
        ]);

        await queryInterface.dropFunction("longitude", [
            { type: "public.geometry", name: "data", direction: "in" },
        ]);
    },
};
