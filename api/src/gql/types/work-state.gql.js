import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from "graphql";
import { isValidAcrossAll } from "../../utils";
import { workDescriptiveModel } from "./models";

export class WorkStateGQL {
    queries = {
        /***
         * All: Return all active work-state
         * args
         * returns list of work-state
         */
        all: () => ({
            type: new GraphQLList(workDescriptiveModel),
            resolve: async (input, args, context) => {
                await isValidAcrossAll({
                    user: context.user,
                    model: context.models.Work.name,
                });

                const data = await context.models.WorkState.findAll({
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
         * activeById: return one active work-state by id
         * args:
         *  id  typeof int
         * returns a single work-state model
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

                const data = await context.models.WorkState.findOne({
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
         * activeByName: return one active work-state by name
         * args:
         *  name: string
         * returns a single work-state model
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
                const data = await context.models.WorkState.findOne({
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
         * create: adds new work-state
         * args:
         *  name: string
         *  description: string
         * Return work-state model
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

                // create work-state
                const data = await context.models.WorkState.create({
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
         * Returns work-state model
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
                ] = await context.models.WorkState.update(
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

export default new WorkStateGQL();
