import { GraphQLObjectType } from "graphql";
import UserGQL from "../types/users-gpl";
import RoleGQL from "../types/roles-gql";

const Mutation = new GraphQLObjectType({
    name: "RootMutation",
    type: "Mutation",
    fields: () => ({
        addUser: UserGQL.mutations.create(),
        deactivateUser: UserGQL.mutations.deactivate(),
        changePassword: UserGQL.mutations.changePassword(),
        addRole: RoleGQL.mutations.create(),
        deactivateRole: RoleGQL.mutations.deactivate(),
    }),
});

export default Mutation;
