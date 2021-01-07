import { Model } from "sequelize";

const spaceUserRole = (sequelize, DataTypes) => {
    class SpaceUserRole extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            SpaceUserRole.belongsTo(models.User, {
                as: "createdBy",
                foreignKey: "createdById",
                foreignKeyConstraint: true,
            });
            SpaceUserRole.belongsTo(models.User, {
                as: "updatedBy",
                foreignKey: "updatedById",
                foreignKeyConstraint: true,
            });
        }
    }
    SpaceUserRole.init(
        {
            userRoleId: DataTypes.INTEGER,
            spaceId: DataTypes.INTEGER,
            active: DataTypes.BOOLEAN,
            createdById: DataTypes.INTEGER,
            updatedById: DataTypes.INTEGER,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "SpaceUserRole",
        }
    );
    return SpaceUserRole;
};

export default spaceUserRole;
