import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from "graphql";
import { isAdminOrManager } from "../../utils";
import { descriptiveModel } from "./models";

export class CommStatusGQL {
    queries = {
        /***
         * All: Return all active comm-status
         * args
         * returns list of comm-status
         */
        all: () => ({
            type: new GraphQLList(descriptiveModel),
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.Comm.name,
                });

                const data = await context.models.CommStatus.findAll({
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
         * activeById: return one active comm-status by id
         * args:
         *  id  typeof int
         * returns a single comm-status model
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

                const data = await context.models.CommStatus.findOne({
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
         * activeByName: return one active comm-status by name
         * args:
         *  name: string
         * returns a single comm-status model
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
                const data = await context.models.CommStatus.findOne({
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
         * create: adds new comm-status
         * args:
         *  name: string
         *  description: string
         * Return comm-status model
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

                // create comm-status
                const data = await context.models.CommStatus.create({
                    displayName: args.name,
                    description: args.description,
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
         * Returns comm-status model
         */
        deactivate: () => ({
            type: descriptiveModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.CommStatus.name,
                });

                const [
                    undatedNum,
                    updated,
                ] = await context.models.CommStatus.update(
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

export default new CommStatusGQL();
