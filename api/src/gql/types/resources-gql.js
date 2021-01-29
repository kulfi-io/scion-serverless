import {
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
} from "graphql";
import { isValidAcrossAll } from "../../utils";
import { resourceModel } from "./models";

export class ResourceGQL {
    queries = {
        /***
         * All: Return all active resources
         * args
         * returns list of resources
         */
        all: () => ({
            type: new GraphQLList(resourceModel),
            resolve: async (input, args, context) => {
                await isValidAcrossAll({
                    user: context.user,
                    model: context.models.Resource.name,
                });

                const data = await context.models.Resource.findAll({
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
         * activeById: return one active resource by id
         * args:
         *  id  typeof int
         * returns a single resource model
         */
        activeById: () => ({
            type: resourceModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                await isValidAcrossAll({
                    user: context.user,
                    model: context.models.Resource.name,
                });

                const data = await context.models.Resource.findOne({
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
                            model: context.models.Role,
                            where: {
                                active: true,
                            },
                            attributes: ["id", "name"],
                        },
                    ],
                });

                return data;
            },
        }),

        /***
         * activeByName: return one active resource by name
         * args:
         *  name: string
         * returns a single resource model
         */
        activeByName: () => ({
            type: resourceModel,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                await isValidAcrossAll({
                    user: context.user,
                    model: context.models.Resource.name,
                });
                const data = await context.models.Resource.findOne({
                    where: {
                        name: args.name,
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
                            model: context.models.Role,
                            where: {
                                active: true,
                            },
                            attributes: ["id", "name"],
                        },
                    ],
                });

                return data;
            },
        }),
    };
    mutations = {
        /**
         * create: adds new resource
         * args:
         *  name: string
         *  description: string
         * Return resource model
         */
        create: () => ({
            type: resourceModel,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                await isValidAcrossAll({
                    user: context.user,
                    model: context.models.Resource.name,
                });

                // create resource
                const data = await context.models.Resource.create({
                    name: args.name,
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
         * Returns resource model
         */
        deactivate: () => ({
            type: resourceModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                await isValidAcrossAll({
                    user: context.user,
                    model: context.models.Resource.name,
                });

                const [
                    undatedNum,
                    updated,
                ] = await context.models.Resource.update(
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

export default new ResourceGQL();
