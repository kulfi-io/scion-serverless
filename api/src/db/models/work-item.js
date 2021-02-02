import { Model } from "sequelize";

const workItem = (sequelize, DataTypes) => {
    class WorkItem extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            WorkItem.belongsTo(models.User, {
                as: "createdBy",
                foreignkey: "createdById",
                foreignKeyConstraint: true,
            });
            WorkItem.belongsTo(models.User, {
                as: "updatedBy",
                foreignkey: "updatedById",
                foreignKeyConstraint: true,
            });
            WorkItem.belongsToMany(models.SpaceWork, {
                through: "SpaceWoks",
                foreignKey: "spaceWorkId",
                foreignKeyConstraint: true,
            });
        }
    }
    WorkItem.init(
        {
            spaceWorkId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
            workStateId: DataTypes.INTEGER,
            createdById: DataTypes.INTEGER,
            updatedById: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "WorkItem",
        }
    );
    return WorkItem;
};

export default workItem;
