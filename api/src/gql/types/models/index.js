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

const permissionResourceModel = new GraphQLObjectType({
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
        resources: { type: GraphQLList(permissionResourceModel) },
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
const roleDisplayModel = new GraphQLObjectType({
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

//#region Resource
const resourceDisplayModel = new GraphQLObjectType({
    name: "resourceDisplayModel",
    type: "query",
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
    },
});

export const resourceModel = new GraphQLObjectType({
    name: "resource",
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

//#region Space
const spaceDisplayModel = new GraphQLObjectType({
    name: "spaceDisplayModel",
    type: "query",
    fields: {
        id: { type: GraphQLInt },
        displayName: { type: GraphQLString },
        description: { type: GraphQLString },
        location: { type: GraphQLString },
        private: { type: GraphQLBoolean },
        address: { type: GraphQLString },
        address2: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zip: { type: GraphQLString },
        phone: { type: GraphQLString },
        cell: { type: GraphQLString },
        email: { type: GraphQLString },
        webPresence: { type: GraphQLString },
    },
});

export const spaceModel = new GraphQLObjectType({
    name: "spaceModel",
    type: "query",
    fields: {
        id: { type: GraphQLInt },
        displayName: { type: GraphQLString },
        description: { type: GraphQLString },
        latitude: { type: GraphQLString },
        longitude: { type: GraphQLString },
        private: { type: GraphQLBoolean },
        address: { type: GraphQLString },
        address2: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zip: { type: GraphQLString },
        phone: { type: GraphQLString },
        cell: { type: GraphQLString },
        email: { type: GraphQLString },
        webPresence: { type: GraphQLString },
        createdBy: { type: userDisplayModel },
        updatedBy: { type: userDisplayModel },
        createdAt: { type: GraphQLScalarDate },
        updatedAt: { type: GraphQLScalarDate },
    },
});
//#endregion

//#region Work
export const workDescriptiveModel = new GraphQLObjectType({
    name: "workDisplayModel",
    type: "query",
    fields: {
        id: { type: GraphQLInt },
        displayName: { type: GraphQLString },
        description: { type: GraphQLString },
        createdBy: { type: userDisplayModel },
        createdAt: { type: GraphQLScalarDate },
        updatedBy: { type: userDisplayModel },
        updatedAt: { type: GraphQLScalarDate },
    },
});

//#endregion
