import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from "graphql";
import { isValidAcrossAll } from "../../utils";
import { workDescriptiveModel } from "./models";

export class WorkStatusGQL {
    queries = {
        /***
         * All: Return all active work-status
         * args
         * returns list of work-status
         */
        all: () => ({
            type: new GraphQLList(workDescriptiveModel),
            resolve: async (input, args, context) => {
                await isValidAcrossAll({
                    user: context.user,
                    model: context.models.Work.name,
                });

                const data = await context.models.WorkStatus.findAll({
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
         * activeById: return one active work-status by id
         * args:
         *  id  typeof int
         * returns a single work-status model
         */
        activeById: () => ({
            type: workDescriptiveModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                await isValidAcrossAll({
                    user: context.user,
                    model: context.models.Work.name,
                });

                const data = await context.models.WorkStatus.findOne({
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
         * activeByName: return one active work-status by name
         * args:
         *  name: string
         * returns a single work-status model
         */
        activeByName: () => ({
            type: workDescriptiveModel,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                await isValidAcrossAll({
                    user: context.user,
                    model: context.models.Work.name,
                });
                const data = await context.models.WorkStatus.findOne({
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
         * create: adds new work-status
         * args:
         *  name: string
         *  description: string
         * Return work-status model
         */
        create: () => ({
            type: workDescriptiveModel,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                await isValidAcrossAll({
                    user: context.user,
                    model: context.models.Work.name,
                });

                // create work-status
                const data = await context.models.WorkStatus.create({
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
         * Returns work-status model
         */
        deactivate: () => ({
            type: workDescriptiveModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                await isValidAcrossAll({
                    user: context.user,
                    model: context.models.Work.name,
                });

                const [
                    undatedNum,
                    updated,
                ] = await context.models.WorkStatus.update(
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

export default new WorkStatusGQL();
