import {
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLBoolean,
} from "graphql";
import { DoubleToDegConverter, isValid } from "../../utils";
import { spaceModel } from "./models";

export class SpaceGQL {
    queries = {
        /***
         * All: Return all active roles
         * args
         * returns list of roles
         */
        all: () => ({
            type: new GraphQLList(spaceModel),
            resolve: async (input, args, context) => {
                await isValid({
                    user: context.user,
                    model: context.models.Space.name,
                });

                const data = await context.models.Space.findAll({
                    attributes: [
                        "id",
                        "displayName",
                        "description",
                        [
                            context.orm.fn(
                                "latitude",
                                context.orm.col("location")
                            ),
                            "latitude",
                        ],
                        [
                            context.orm.fn(
                                "longitude",
                                context.orm.col("location")
                            ),
                            "longitude",
                        ],
                        "private",
                        "address",
                        "address2",
                        "city",
                        "state",
                        "zip",
                        "phone",
                        "cell",
                        "email",
                        "webPresence",
                        "verified",
                        "active",
                        "createdAt",
                        "updatedAt",
                    ],
                    where: {
                        active: true,
                    },
                    include: [
                        {
                            model: context.models.User,
                            as: "createdBy",
                            attributes: [
                                "id",
                                "firstName",
                                "lastName",
                                "email",
                            ],
                        },
                        {
                            model: context.models.User,
                            as: "updatedBy",
                            attributes: [
                                "id",
                                "firstName",
                                "lastName",
                                "email",
                            ],
                        },
                    ],
                });

                data.map((item) => {
                    item.latitude = DoubleToDegConverter(
                        item.dataValues.latitude
                    );
                    item.longitude = DoubleToDegConverter(
                        item.dataValues.longitude,
                        "long"
                    );
                });

                return data;
            },
        }),

        /***
         * activeById: return one active user by id
         * args:
         *  id  typeof int
         * returns a single user model
         */
        activeById: () => ({
            type: spaceModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                await isValid({
                    user: context.user,
                    model: context.models.Space.name,
                });

                const data = await context.models.Space.findOne({
                    attributes: [
                        "id",
                        "displayName",
                        "description",
                        [
                            context.orm.fn(
                                "latitude",
                                context.orm.col("location")
                            ),
                            "latitude",
                        ],
                        [
                            context.orm.fn(
                                "longitude",
                                context.orm.col("location")
                            ),
                            "longitude",
                        ],
                        "private",
                        "address",
                        "address2",
                        "city",
                        "state",
                        "zip",
                        "phone",
                        "cell",
                        "email",
                        "webPresence",
                        "verified",
                        "active",
                        "createdAt",
                        "updatedAt",
                    ],
                    where: {
                        id: args.id,
                        active: true,
                    },
                    include: [
                        {
                            model: context.models.User,
                            as: "createdBy",
                            attributes: [
                                "id",
                                "firstName",
                                "lastName",
                                "email",
                            ],
                        },
                        {
                            model: context.models.User,
                            as: "updatedBy",
                            attributes: [
                                "id",
                                "firstName",
                                "lastName",
                                "email",
                            ],
                        },
                    ],
                });

                data.latitude = DoubleToDegConverter(data.dataValues.latitude);
                data.longitude = DoubleToDegConverter(
                    data.dataValues.longitude,
                    "long"
                );

                return data;
            },
        }),

        /***
         * activeByName: return one active role by name
         * args:
         *  name: string
         * returns a single role model
         */
        activeByName: () => ({
            type: spaceModel,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                await isValid({
                    user: context.user,
                    model: context.models.Space.name,
                });
                const data = await context.models.Space.findOne({
                    attributes: [
                        "id",
                        "displayName",
                        "description",
                        [
                            context.orm.fn(
                                "latitude",
                                context.orm.col("location")
                            ),
                            "latitude",
                        ],
                        [
                            context.orm.fn(
                                "longitude",
                                context.orm.col("location")
                            ),
                            "longitude",
                        ],
                        "private",
                        "address",
                        "address2",
                        "city",
                        "state",
                        "zip",
                        "phone",
                        "cell",
                        "email",
                        "webPresence",
                        "verified",
                        "active",
                        "createdAt",
                        "updatedAt",
                    ],
                    where: {
                        displayName: args.name,
                        active: true,
                    },
                    include: [
                        {
                            model: context.models.User,
                            as: "createdBy",
                            attributes: [
                                "id",
                                "firstName",
                                "lastName",
                                "email",
                            ],
                        },
                        {
                            model: context.models.User,
                            as: "updatedBy",
                            attributes: [
                                "id",
                                "firstName",
                                "lastName",
                                "email",
                            ],
                        },
                    ],
                });

                data.latitude = DoubleToDegConverter(data.dataValues.latitude);
                data.longitude = DoubleToDegConverter(
                    data.dataValues.longitude,
                    "long"
                );

                return data;
            },
        }),
    };
    mutations = {
        /**
         * create: adds new space
         * args:
         *  name: string
         *  description: string
         *  geo: string
         *  private: boolean
         *  address: string
         *  address2: string
         *  city: string
         *  state: string
         *  zip: string
         *  phone: string
         *  cell: string
         *  email: string
         *  webPresence: string
         * Return user model
         */
        create: () => ({
            type: spaceModel,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                geo: { type: GraphQLNonNull(GraphQLString) },
                private: { type: GraphQLNonNull(GraphQLBoolean) },
                address: { type: GraphQLString },
                address2: { type: GraphQLString },
                city: { type: GraphQLString },
                state: { type: GraphQLString },
                zip: { type: GraphQLString },
                phone: { type: GraphQLNonNull(GraphQLString) },
                cell: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                webPresence: { type: GraphQLString },
            },
            resolve: async (input, args, context) => {
                await isValid({
                    user: context.user,
                    model: context.models.Space.name,
                });

                // create Space
                const data = await context.models.Space.create({
                    displayName: args.name,
                    name: args.name,
                    description: args.description,
                    location: context.orm.fn(
                        "create_geometryFromText",
                        `POINT(${args.geo})`
                    ),
                    private: args.private,
                    address: args.address ? args.address : String.Empty,
                    address2: args.address2 ? args.address2 : String.Empty,
                    city: args.city ? args.city : String.Empty,
                    state: args.state ? args.state : String.Empty,
                    zip: args.zip ? args.zip : String.Empty,
                    phone: args.phone,
                    cell: args.cell,
                    email: args.email,
                    webPresence: args.webPresence
                        ? args.webPresence
                        : String.Empty,
                    createdById: context.user.userId,
                    updatedById: context.user.userId,
                    attributes: ["id"],
                });

                return data;
            },
        }),
        /**
         * deactivate: sets the record inactive
         * args
         *  id: int
         * Returns space model
         */
        deactivate: () => ({
            type: spaceModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                await isValid({
                    user: context.user,
                    model: context.models.Space.name,
                });

                const [undatedNum, updated] = await context.models.Space.update(
                    {
                        active: false,
                        updateById: context.user.userId,
                        updatedAt: Date.now,
                    },
                    {
                        where: {
                            id: args.id,
                        },
                        returning: true,
                        plain: true,
                    }
                );

                return updated;
            },
        }),
    };
}

export default new SpaceGQL();
