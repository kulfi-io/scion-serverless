import {
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
} from "graphql";
import { isValidAcrossAll } from "../../utils";
import { roleModel } from "./models";

export class RoleGQL {
    queries = {
        /***
         * All: Return all active roles
         * args
         * returns list of roles
         */
        all: () => ({
            type: new GraphQLList(roleModel),
            resolve: async (input, args, context) => {
                await isValidAcrossAll({
                    user: context.user,
                    model: context.models.Role.name,
                });

                const data = await context.models.Role.findAll({
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
         * activeById: return one active user by id
         * args:
         *  id  typeof int
         * returns a single user model
         */
        activeById: () => ({
            type: roleModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                await isValidAcrossAll({
                    user: context.user,
                    model: context.models.Role.name,
                });

                const data = await context.models.Role.findOne({
                    where: {
                        id: args.id,
                        active: true,
                    },
                });

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
            type: roleModel,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                await isValidAcrossAll({
                    user: context.user,
                    model: context.models.Role.name,
                });
                const data = await context.models.Role.findOne({
                    where: {
                        name: args.name,
                        active: true,
                    },
                });

                return data;
            },
        }),
    };
    mutations = {
        /**
         * create: adds new role
         * args:
         *  name: string
         *  description: string
         * Return user model
         */
        create: () => ({
            type: roleModel,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                await isValidAcrossAll({
                    user: context.user,
                    model: context.models.Role.name,
                });

                // create role
                const data = await context.models.Role.create({
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
         * Returns role model
         */
        deactivate: () => ({
            type: roleModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                await isValidAcrossAll({
                    user: context.user,
                    model: context.models.Role.name,
                });

                const [undatedNum, updated] = await context.models.Role.update(
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

export default new RoleGQL();
