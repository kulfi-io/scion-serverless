import { Model } from "sequelize";

const workCategory = (sequelize, DataTypes) => {
    class WorkCategory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            WorkCategory.belongsTo(models.User, {
                as: "createdBy",
                foreignkey: "createdById",
                foreignKeyConstraint: true,
            });
            WorkCategory.belongsTo(models.User, {
                as: "updatedBy",
                foreignkey: "updatedById",
                foreignKeyConstraint: true,
            });
        }
    }
    WorkCategory.init(
        {
            displayName: DataTypes.STRING,
            description: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
            createdById: DataTypes.INTEGER,
            updatedById: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "WorkCategory",
        }
    );
    return WorkCategory;
};

export default workCategory;
