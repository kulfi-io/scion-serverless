import { GraphQLObjectType } from "graphql";
import UserGQL from "../types/users-gpl";
import RoleGQL from "../types/roles-gql";
import ResourceGQL from "../types/resources-gql";
import SpaceGQL from "../types/space-gql";
import WorkCategoryGql from "../types/work-category.gql";
import WorkStateGql from "../types/work-state.gql";
import WorkStatusGql from "../types/work-status.gql";
import WorkTypeGql from "../types/work-type.gql";
import WorkGQL from "../types/work.gql";

const Mutation = new GraphQLObjectType({
    name: "RootMutation",
    type: "Mutation",
    fields: () => ({
        addUser: UserGQL.mutations.create(),
        deactivateUser: UserGQL.mutations.deactivate(),
        changePassword: UserGQL.mutations.changePassword(),
        addRole: RoleGQL.mutations.create(),
        deactivateRole: RoleGQL.mutations.deactivate(),
        addResource: ResourceGQL.mutations.create(),
        deactivateResource: ResourceGQL.mutations.deactivate(),
        addSpace: SpaceGQL.mutations.create(),
        deactivateSpace: SpaceGQL.mutations.deactivate(),
        addCategory: WorkCategoryGql.mutations.create(),
        deactivateCategory: WorkCategoryGql.mutations.deactivate(),
        addWorkState: WorkStateGql.mutations.create(),
        deactivateWorkState: WorkStateGql.mutations.deactivate(),
        addWorkStatus: WorkStatusGql.mutations.create(),
        deactivateWorkStatus: WorkStatusGql.mutations.deactivate(),
        addWorkType: WorkTypeGql.mutations.create(),
        deactivateWorkType: WorkTypeGql.mutations.deactivate(),
        addWork: WorkGQL.mutations.create(),
        deactivateWork: WorkGQL.mutations.deactivate(),
    }),
});

export default Mutation;
