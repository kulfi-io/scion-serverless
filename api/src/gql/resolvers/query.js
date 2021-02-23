import { GraphQLObjectType, GraphQLString } from "graphql";
import RoleGQL from "../types/roles-gql";
import UserGQL from "../types/users-gpl";
import ResourceGQL from "../types/resources-gql";
import SpaceGQL from "../types/space-gql";
import WorkCategoryGQL from "../types/work-category.gql";
import WorkStateGQL from "../types/work-state.gql";
import WorkStatusGQL from "../types/work-status.gql";
import WorkTypeGQL from "../types/work-type.gql";
import WorkGQL from "../types/work.gql";
import CommStatusGQL from "../types/comm-status.gql";
import CommTypeGQL from "../types/comm-type.gql";
import CommGQL from "../types/comm.gql";

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
        works: WorkGQL.queries.all(),
        workById: WorkGQL.queries.activeById(),
        workByName: WorkGQL.queries.activeByName(),
        commStatuses: CommStatusGQL.queries.all(),
        commStatusById: CommStatusGQL.queries.activeById(),
        commStatusByName: CommStatusGQL.queries.activeByName(),
        commTypes: CommTypeGQL.queries.all(),
        commTypeById: CommTypeGQL.queries.activeById(),
        commTypeByName: CommTypeGQL.queries.activeByName(),
        comms: CommGQL.queries.all(),
        commById: CommGQL.queries.activeById(),
        commByName: CommGQL.queries.activeByName(),
    }),
});

export default Query;
