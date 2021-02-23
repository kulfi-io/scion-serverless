import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from "graphql";
import { isAdminOrManager } from "../../utils";
import { commModel } from "./models";

export class CommGQL {
    queries = {
        /***
         * All: Return all active comm
         * args
         * returns list of comm
         */
        all: () => ({
            type: new GraphQLList(commModel),
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.Comm.name,
                });

                const data = await context.models.Comm.findAll({
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
                        {
                            model: context.models.CommType,
                            as: "commType",
                            attributes: ["id", "displayName", "description"],
                        },
                    ],
                });

                data.map((item) => {
                    item.commType = item.dataValues.commType;
                });

                return data;
            },
        }),

        /***
         * activeById: return one active comm by id
         * args:
         *  id  typeof int
         * returns a single comm model
         */
        activeById: () => ({
            type: commModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.Comm.name,
                });

                const data = await context.models.Comm.findOne({
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
                        {
                            model: context.models.CommType,
                            as: "commType",
                            attributes: ["id", "displayName", "description"],
                        },
                    ],
                });

                if (data) {
                    data.commType = data.dataValues.commType;
                }

                return data;
            },
        }),

        /***
         * activeByName: return one active comm by name
         * args:
         *  name: string
         * returns a single comm model
         */
        activeByName: () => ({
            type: commModel,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.Comm.name,
                });
                const data = await context.models.Comm.findOne({
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
                        {
                            model: context.models.CommType,
                            as: "commType",
                            attributes: ["id", "displayName", "description"],
                        },
                    ],
                });

                if (data) {
                    data.commType = data.dataValues.commType;
                }

                return data;
            },
        }),
    };
    mutations = {
        /**
         * create: adds new comm
         * args:
         *  name: string
         *  description: string
         *  rate: double
         *  status: int
         *  type: int
         *  category: int
         * Return comm model
         */
        create: () => ({
            type: commModel,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                type: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.Comm.name,
                });

                // create comm
                const data = await context.models.Comm.create({
                    displayName: args.name,
                    description: args.description,
                    commTypeId: args.type,
                    createdById: context.user.userId,
                    updatedById: context.user.userId,
                });

                return data;
            },
        }),
        /**
         * deactivate: sets the record inactive
         * args
         *  id: int
         * Returns comm model
         */
        deactivate: () => ({
            type: commModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.Comm.name,
                });

                const [undatedNum, updated] = await context.models.Comm.update(
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

export default new CommGQL();
