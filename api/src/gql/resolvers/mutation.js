import { GraphQLObjectType } from "graphql";
import UserGQL from "../types/users-gpl";
import RoleGQL from "../types/roles-gql";
import ResourceGQL from "../types/resources-gql";
import SpaceGQL from "../types/space-gql";
import workCategoryGql from "../types/work-category.gql";
import workStateGql from "../types/work-state.gql";
import workStatusGql from "../types/work-status.gql";
import workTypeGql from "../types/work-type.gql";

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
        addCategory: workCategoryGql.mutations.create(),
        deactivateCategory: workCategoryGql.mutations.deactivate(),
        addWorkState: workStateGql.mutations.create(),
        deactivateWorkState: workStateGql.mutations.deactivate(),
        addWorkStatus: workStatusGql.mutations.create(),
        deactivateWorkStatus: workStatusGql.mutations.deactivate(),
        addWorkType: workTypeGql.mutations.create(),
        deactivateWorkType: workTypeGql.mutations.deactivate(),
    }),
});

export default Mutation;
