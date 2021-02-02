import { Model } from "sequelize";

const workStatus = (sequelize, DataTypes) => {
    class WorkStatus extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            WorkStatus.belongsTo(models.User, {
                as: "createdBy",
                foreignkey: "createdById",
                foreignKeyConstraint: true,
            });
            WorkStatus.belongsTo(models.User, {
                as: "updatedBy",
                foreignkey: "updatedById",
                foreignKeyConstraint: true,
            });
        }
    }
    WorkStatus.init(
        {
            displayName: DataTypes.STRING,
            description: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
            createdById: DataTypes.INTEGER,
            updatedById: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "WorkStatus",
        }
    );
    return WorkStatus;
};

export default workStatus;
