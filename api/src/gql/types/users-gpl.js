import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from "graphql";
import {
    compareData,
    createHash,
    createLoginToken,
    isAdminOrManager,
    isValid,
    isValidSelf,
} from "../../utils";
import { loginModel, userModel } from "./models";

export class UserGQL {
    queries = {
        /***
         * All: Return all active users
         * args
         * returns list of users
         */
        all: () => ({
            type: new GraphQLList(userModel),
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.User.name,
                });

                const data = await context.models.User.findAll({
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
                            model: context.models.Role,
                            where: {
                                active: true,
                            },
                            attributes: ["id", "name"],
                        },
                    ],
                });

                const _data = data.map((user) => {
                    return {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        verified: user.verified,
                        roles: user.Roles.map((role) => {
                            return {
                                id: role.id,
                                name: role.name,
                                isDefault: role.UserSpaceRole.isDefault,
                            };
                        }),
                        createdAt: user.createdAt,
                        createdBy: user.createdBy,
                        updatedAt: user.updatedAt,
                        updatedBy: user.updatedBy,
                    };
                });

                return _data;
            },
        }),

        /***
         * activeById: return one active user by id
         * args:
         *  id  typeof int
         * returns a single user model
         */
        activeById: () => ({
            type: userModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.User.name,
                });

                const data = await context.models.User.findOne({
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
         * activeByEmail: return one active user by email
         * args:
         *  email: string
         * returns a single user model
         */
        activeByEmail: () => ({
            type: userModel,
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.User.name,
                });
                const data = await context.models.User.findOne({
                    where: {
                        email: args.email,
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

        /**
         * login
         * args:
         *  email: string
         *  password: string
         * returns login model
         */
        login: () => ({
            type: loginModel,
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                const data = await context.models.User.findOne({
                    attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "email",
                        "password",
                    ],
                    where: {
                        active: true,
                        email: args.email,
                    },
                    include: [
                        {
                            model: context.models.Role,
                            attibutes: ["id", "name"],
                            where: {
                                active: true,
                            },
                            include: [
                                {
                                    model: context.models.Resource,
                                    where: {
                                        active: true,
                                    },
                                    attributes: ["id", "name"],
                                    include: {
                                        model: context.models.Permission,
                                        where: {
                                            active: true,
                                        },
                                        attributes: ["id", "name"],
                                    },
                                },
                            ],
                        },
                        {
                            model: context.models.Space,
                            attributes: ["id", "displayName"],
                            where: {
                                active: true,
                            },
                        },
                    ],
                });
                if (data && data.password && args.password) {
                    const valid = await compareData(
                        args.password,
                        data.password
                    );

                    if (!valid) return new Error("Invalid Password");

                    const _data = {
                        user: {
                            firstName: data.firstName,
                            lastName: data.lastName,
                            fullName: data.firstName + " " + data.lastName,
                            email: data.email,
                        },
                        roles: data.Roles.map((role) => {
                            return {
                                id: role.id,
                                name: role.name,
                                isDefault: role.UserSpaceRole.isDefault,
                                resources:
                                    role.UserSpaceRole.isDefault === true
                                        ? role.Resources.map((res) => {
                                              return {
                                                  id: res.id,
                                                  name: res.name,
                                                  permissions: res.Permissions.map(
                                                      (perm) => {
                                                          return perm.name;
                                                      }
                                                  ),
                                              };
                                          })
                                        : [],
                            };
                        }),
                    };

                    _data.token = createLoginToken({
                        userId: data.id,
                        created: Date.now,
                        payload: {
                            selected: _data.roles.filter(
                                (x) => x.isDefault === true
                            ),
                            roles: _data.roles.filter(
                                (x) => x.isDefault === false
                            ),
                        },
                    });

                    return _data;
                }

                return new Error("Login failure");
            },
        }),
    };

    mutations = {
        /**
         * create: adds new user
         * args:
         *  firstName: string
         *  lastName: string
         *  email: string
         *  roleId: int
         *  requestor: string //hashed id value
         * Return user model
         */
        create: () => ({
            type: userModel,
            args: {
                firstName: { type: GraphQLNonNull(GraphQLString) },
                lastName: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
                roleId: { type: GraphQLNonNull(GraphQLInt) },
                spaceId: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.User.name,
                });

                const hashed = await createHash(args.password);

                // create user
                const data = await context.models.User.create({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: hashed,
                    createdById: context.user.userId,
                    updatedById: context.user.userId,
                });

                // Assign user role and set default
                if (data.id) {
                    // user space role
                    const usrResult = await context.models.UserSpaceRole.create(
                        {
                            roleId: args.roleId,
                            spaceId: args.spaceId,
                            userId: data.id,
                            isDefault: true,
                            createdById: context.user.userId,
                            updatedById: context.user.userId,
                        }
                    );

                    return data;
                }

                throw new Error("Unable to create user");
            },
        }),
        /**
         * deactivate: sets the record inactive
         * args
         *  id: int
         *  requestor: string // hashed id value
         * Returns user model
         */
        deactivate: () => ({
            type: userModel,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                await isAdminOrManager({
                    user: context.user,
                    model: context.models.User.name,
                });

                const destroyed = await context.models.UserSpaceRole.destroy({
                    where: {
                        userId: args.id,
                    },
                });
                if (destroyed) {
                    const [
                        undatedNum,
                        updated,
                    ] = await context.models.User.update(
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
                }

                return new Error("Deactivation Failure");
            },
        }),

        // communication module
        // user recieves an email with a reset password request
        // needs to be constructed
        // resetPassword: () => ({})

        /**
         * changePassword: changes user password
         * args:
         *  requestor: string // hashed id value
         *  oldPassword: string // old password
         *  password: string // new password
         * Returns user model
         */
        changePassword: () => ({
            type: userModel,
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
                oldPassword: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                let data = await context.models.User.findOne({
                    attributes: ["id", "email", "password"],
                    where: {
                        email: args.email,
                        active: true,
                    },
                });

                if (data) {
                    await isValid({
                        user: context.user,
                        model: context.models.User.name,
                        targetUserId: data.id,
                    });

                    const valid = await compareData(
                        args.oldPassword,
                        data.password
                    );

                    if (!valid)
                        throw new Error("User or password is incorrect!");

                    const hashed = await createHash(args.password);

                    const [
                        updatedNum,
                        updated,
                    ] = await context.models.User.update(
                        {
                            password: hashed,
                            updatedById: context.user.userId,
                            updatedAt: Date.now,
                        },
                        {
                            where: {
                                id: data.id,
                            },
                            returning: true,
                            plain: true,
                        }
                    );

                    return updated;
                }

                return data;
            },
        }),
    };
}

export default new UserGQL();
