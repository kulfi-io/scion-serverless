import { GraphQLObjectType, GraphQLString } from "graphql";
import RoleGQL from "../types/roles-gql";
import UserGQL from "../types/users-gpl";
import ResourceGQL from "../types/resources-gql";
import SpaceGQL from "../types/space-gql";
import WorkCategoryGQL from "../types/work-category.gql";
import WorkStateGQL from "../types/work-state.gql";
import WorkStatusGQL from "../types/work-status.gql";
import WorkTypeGQL from "../types/work-type.gql";

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
        workCategories: WorkCategoryGQL.queries.all(),
        workCategoryById: WorkCategoryGQL.queries.activeById(),
        workCategoryByName: WorkCategoryGQL.queries.activeByName(),
        workStates: WorkStateGQL.queries.all(),
        workStateById: WorkStateGQL.queries.activeById(),
        workStateByName: WorkStateGQL.queries.activeByName(),
        workStatuses: WorkStatusGQL.queries.all(),
        workStatusById: WorkStatusGQL.queries.activeById(),
        workStatusByName: WorkStatusGQL.queries.activeByName(),
        workTypes: WorkTypeGQL.queries.all(),
        workTypeById: WorkTypeGQL.queries.activeById(),
        workTypeByName: WorkTypeGQL.queries.activeByName(),
    }),
});

export default Query;
