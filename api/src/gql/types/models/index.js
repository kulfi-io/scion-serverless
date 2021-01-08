import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
} from "graphql";
import { GraphQLScalarDate } from "../../../utils";

//#region User
const userDisplayModel = new GraphQLObjectType({
    name: "userDisplayModel",
    type: "query",
    fields: {
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        fullName: { type: GraphQLString },
        email: { type: GraphQLString },
    },
});

const userRoleModel = new GraphQLObjectType({
    name: "userRoleModel",
    type: "query",
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        isDefault: { type: GraphQLBoolean },
    },
});

const resourceModel = new GraphQLObjectType({
    name: "resourceModel",
    type: "query",
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        permissions: { type: GraphQLList(GraphQLString) },
    },
});

const userRoleResourceModel = new GraphQLObjectType({
    name: "userRoleResourceModel",
    type: "query",
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        isDefault: { type: GraphQLBoolean },
        resources: { type: GraphQLList(resourceModel) },
    },
});

export const userModel = new GraphQLObjectType({
    name: "user",
    type: "query",
    fields: {
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        verified: { type: GraphQLBoolean },
        createdBy: { type: userDisplayModel },
        updatedBy: { type: userDisplayModel },
        createdAt: { type: GraphQLScalarDate },
        updatedAt: { type: GraphQLScalarDate },
        roles: { type: GraphQLList(userRoleModel) },
    },
});

export const loginModel = new GraphQLObjectType({
    name: "loginModel",
    type: "query",
    fields: {
        user: { type: userDisplayModel },
        roles: { type: GraphQLList(userRoleResourceModel) },
        token: { type: GraphQLString },
        requestor: { type: GraphQLString },
    },
});

//#endregion

//#region Role
const displayModel = new GraphQLObjectType({
    name: "roleDisplayModel",
    type: "query",
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
    },
});

export const roleModel = new GraphQLObjectType({
    name: "role",
    type: "query",
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        createdBy: { type: userDisplayModel },
        updatedBy: { type: userDisplayModel },
        createdAt: { type: GraphQLScalarDate },
        updatedAt: { type: GraphQLScalarDate },
    },
});
//#endregion
