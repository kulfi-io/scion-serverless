import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from "graphql";
import { isAdminOrManager } from "../../utils";
import { descriptiveModel } from "./models";

export class CommTypeGQL {
    queries = {
        /***
         * All: Return all active comm-types
         * args
         * returns list of comm-types
         */
        all: () => ({
            type: new GraphQLList(descriptiveModel),
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.Comm.name,
                });

                const data = await context.models.CommType.findAll({
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

                return data;
            },
        }),

        /***
         * activeById: return one active comm-type by id
         * args:
         *  id  typeof int
         * returns a single comm-type model
         */
        activeById: () => ({
            type: descriptiveModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.Comm.name,
                });

                const data = await context.models.CommType.findOne({
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

                return data;
            },
        }),

        /***
         * activeByName: return one active comm-type by name
         * args:
         *  name: string
         * returns a single comm-type model
         */
        activeByName: () => ({
            type: descriptiveModel,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.Comm.name,
                });
                const data = await context.models.CommType.findOne({
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

                return data;
            },
        }),
    };
    mutations = {
        /**
         * create: adds new comm-type
         * args:
         *  name: string
         *  description: string
         * Return comm-type model
         */
        create: () => ({
            type: descriptiveModel,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.Comm.name,
                });

                // create comm-type
                const data = await context.models.CommType.create({
                    displayName: args.name,
                    description: args.description,
                    active: true,
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
         * Returns comm-type model
         */
        deactivate: () => ({
            type: descriptiveModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.Comm.name,
                });

                const [
                    undatedNum,
                    updated,
                ] = await context.models.CommType.update(
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

export default new CommTypeGQL();
