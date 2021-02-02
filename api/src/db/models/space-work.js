import { Model } from "sequelize";

const spaceWork = (sequelize, DataTypes) => {
    class SpaceWork extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            SpaceWork.belongsTo(models.User, {
                as: "createdBy",
                foreignkey: "createdById",
                foreignKeyConstraint: true,
            });
            SpaceWork.belongsTo(models.User, {
                as: "updatedBy",
                foreignkey: "updatedById",
                foreignKeyConstraint: true,
            });
            SpaceWork.belongsToMany(models.Space, {
                through: "SpaceWorks",
                foreignKey: "spaceId",
                foreignKeyConstraint: true,
            });
            SpaceWork.belongsToMany(models.Work, {
                through: "SpaceWorks",
                foreignKey: "workId",
                foreignKeyConstraint: true,
            });
        }
    }
    SpaceWork.init(
        {
            spaceId: DataTypes.INTEGER,
            workId: DataTypes.INTEGER,
            active: DataTypes.BOOLEAN,
            createdById: DataTypes.INTEGER,
            modifiedById: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "SpaceWork",
        }
    );
    return SpaceWork;
};

export default spaceWork;
