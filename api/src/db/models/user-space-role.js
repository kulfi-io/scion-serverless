import { Model } from "sequelize";
const userSpaceRole = (sequelize, DataTypes) => {
    class UserSpaceRole extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            UserSpaceRole.belongsTo(models.User, {
                as: "createdBy",
                foreignKey: "createdById",
                foreignKeyConstraint: true,
            });
            UserSpaceRole.belongsTo(models.User, {
                as: "updatedBy",
                foreignKey: "updatedById",
                foreignKeyConstraint: true,
            });
            UserSpaceRole.belongsTo(models.User, {
                as: "USRUser",
                foreignKey: "userId",
                foreignKeyConstraint: true,
            });
            UserSpaceRole.belongsTo(models.Role, {
                as: "USRRole",
                foreignKey: "roleId",
                foreignKeyConstraint: true,
            });
            UserSpaceRole.belongsTo(models.Space, {
                as: "USRSpace",
                foreignKey: "spaceId",
                foreignKeyConstraint: true,
            });
        }
    }
    UserSpaceRole.init(
        {
            userId: DataTypes.INTEGER,
            spaceId: DataTypes.INTEGER,
            roleId: DataTypes.INTEGER,
            isDefault: DataTypes.BOOLEAN,
            active: DataTypes.BOOLEAN,
            createdById: DataTypes.INTEGER,
            updatedById: DataTypes.INTEGER,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "UserSpaceRole",
        }
    );
    return UserSpaceRole;
};

export default userSpaceRole;
