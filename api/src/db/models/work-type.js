import { Model } from "sequelize";

const workType = (sequelize, DataTypes) => {
    class WorkType extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            WorkType.belongsTo(models.User, {
                as: "createdBy",
                foreignkey: "createdById",
                foreignKeyConstraint: true,
            });
            WorkType.belongsTo(models.User, {
                as: "updatedBy",
                foreignkey: "updatedById",
                foreignKeyConstraint: true,
            });
        }
    }
    WorkType.init(
        {
            displayName: DataTypes.STRING,
            description: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
            createdById: DataTypes.INTEGER,
            updatedById: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "WorkType",
        }
    );
    return WorkType;
};

export default workType;
