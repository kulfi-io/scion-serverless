import { GraphQLObjectType, GraphQLString } from "graphql";
import RoleGQL from "../types/roles-gql";
import UserGQL from "../types/users-gpl";
import ResourceGQL from "../types/resources-gql";
import SpaceGQL from "../types/space-gql";

const Query = new GraphQLObjectType({
    name: "RootQuery",
    type: "Query",
    fields: () => ({
        health: {
            type: GraphQLString,
            resolve: () => "Hello",
        },
        users: UserGQL.queries.all(),
        userById: UserGQL.queries.activeById(),
        userByEmail: UserGQL.queries.activeByEmail(),
        login: UserGQL.queries.login(),
        roles: RoleGQL.queries.all(),
        roleById: RoleGQL.queries.activeById(),
        roleByName: RoleGQL.queries.activeByName(),
        resources: ResourceGQL.queries.all(),
        resourceById: ResourceGQL.queries.activeById(),
        resourceByName: ResourceGQL.queries.activeByName(),
        spaces: SpaceGQL.queries.all(),
        spaceById: SpaceGQL.queries.activeById(),
        spaceByName: SpaceGQL.queries.activeByName(),
    }),
});

export default Query;
