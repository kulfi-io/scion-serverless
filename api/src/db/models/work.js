import { Model } from "sequelize";

const work = (sequelize, DataTypes) => {
    class Work extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Work.belongsTo(models.User, {
                as: "createdBy",
                foreignkey: "createdById",
                foreignKeyConstraint: true,
            });
            Work.belongsTo(models.User, {
                as: "updatedBy",
                foreignkey: "updatedById",
                foreignKeyConstraint: true,
            });
            Work.belongsTo(models.WorkStatus, {
                as: "workStatus",
                foreignKey: "workStatusId",
                foreignKeyConstraint: true,
            });
            Work.belongsTo(models.WorkType, {
                as: "workType",
                foreignKey: "workTypeId",
                foreignKeyConstraint: true,
            });
            Work.belongsTo(models.WorkCategory, {
                as: "workCategory",
                foreignKey: "workCategoryId",
                foreignKeyConstraint: true,
            });
        }
    }
    Work.init(
        {
            displayName: DataTypes.STRING,
            description: DataTypes.STRING,
            rate: DataTypes.FLOAT,
            workStatusId: DataTypes.INTEGER,
            workTypeId: DataTypes.INTEGER,
            workCategoryId: DataTypes.INTEGER,
            active: DataTypes.BOOLEAN,
            createdById: DataTypes.INTEGER,
            updatedById: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Work",
        }
    );
    return Work;
};

export default work;
