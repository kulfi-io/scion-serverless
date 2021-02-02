import { Model } from "sequelize";

const workState = (sequelize, DataTypes) => {
    class WorkState extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            WorkState.belongsTo(models.User, {
                as: "createdBy",
                foreignkey: "createdById",
                foreignKeyConstraint: true,
            });
            WorkState.belongsTo(models.User, {
                as: "updatedBy",
                foreignkey: "updatedById",
                foreignKeyConstraint: true,
            });
        }
    }
    WorkState.init(
        {
            displayName: DataTypes.STRING,
            description: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
            createdById: DataTypes.INTEGER,
            updatedById: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "WorkState",
        }
    );
    return WorkState;
};

export default workState;
