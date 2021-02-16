import {
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from "graphql";
import { isAdminOrManager } from "../../utils";
import { workModel } from "./models";

export class WorkGQL {
    queries = {
        /***
         * All: Return all active work
         * args
         * returns list of work
         */
        all: () => ({
            type: new GraphQLList(workModel),
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.Work.name,
                });

                const data = await context.models.Work.findAll({
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
                            model: context.models.WorkCategory,
                            as: "workCategory",
                            attributes: ["id", "displayName", "description"],
                        },
                        {
                            model: context.models.WorkStatus,
                            as: "workStatus",
                            attributes: ["id", "displayName", "description"],
                        },
                        {
                            model: context.models.WorkType,
                            as: "workType",
                            attributes: ["id", "displayName", "description"],
                        },
                    ],
                });

                data.map((item) => {
                    item.workCategory = item.dataValues.workCategory;
                    item.workStatus = item.dataValues.workStatus;
                    item.workType = item.dataValues.workType;
                });

                return data;
            },
        }),

        /***
         * activeById: return one active work by id
         * args:
         *  id  typeof int
         * returns a single work model
         */
        activeById: () => ({
            type: workModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.Work.name,
                });

                const data = await context.models.Work.findOne({
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
                            model: context.models.WorkCategory,
                            as: "workCategory",
                            attributes: ["id", "displayName", "description"],
                        },
                        {
                            model: context.models.WorkStatus,
                            as: "workStatus",
                            attributes: ["id", "displayName", "description"],
                        },
                        {
                            model: context.models.WorkType,
                            as: "workType",
                            attributes: ["id", "displayName", "description"],
                        },
                    ],
                });

                if (data) {
                    data.workCategory = data.dataValues.workCategory;
                    data.workStaus = data.dataValues.workStatus;
                    data.workType = data.dataValues.workType;
                }

                return data;
            },
        }),

        /***
         * activeByName: return one active work by name
         * args:
         *  name: string
         * returns a single work model
         */
        activeByName: () => ({
            type: workModel,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.Work.name,
                });
                const data = await context.models.Work.findOne({
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
                            model: context.models.WorkCategory,
                            as: "workCategory",
                            attributes: ["id", "displayName", "description"],
                        },
                        {
                            model: context.models.WorkStatus,
                            as: "workStatus",
                            attributes: ["id", "displayName", "description"],
                        },
                        {
                            model: context.models.WorkType,
                            as: "workType",
                            attributes: ["id", "displayName", "description"],
                        },
                    ],
                });

                if (data) {
                    data.workCategory = data.dataValues.workCategory;
                    data.workStaus = data.dataValues.workStatus;
                    data.workType = data.dataValues.workType;
                }

                return data;
            },
        }),
    };
    mutations = {
        /**
         * create: adds new work
         * args:
         *  name: string
         *  description: string
         *  rate: double
         *  status: int
         *  type: int
         *  category: int
         * Return work model
         */
        create: () => ({
            type: workModel,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                rate: { type: GraphQLNonNull(GraphQLFloat) },
                status: { type: GraphQLNonNull(GraphQLInt) },
                type: { type: GraphQLNonNull(GraphQLInt) },
                category: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.Work.name,
                });

                // create work
                const data = await context.models.Work.create({
                    displayName: args.name,
                    description: args.description,
                    rate: args.rate,
                    workStatusId: args.status,
                    workTypeId: args.type,
                    workCategoryId: args.category,
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
         * Returns work model
         */
        deactivate: () => ({
            type: workModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.Work.name,
                });

                const [undatedNum, updated] = await context.models.Work.update(
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

export default new WorkGQL();
