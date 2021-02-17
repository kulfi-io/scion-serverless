import { Model } from "sequelize";

const commUser = (sequelize, DataTypes) => {
    class CommUser extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            CommUser.belongsTo(models.User, {
                as: "createdBy",
                foreignkey: "createdById",
                foreignKeyConstraint: true,
            });
            CommUser.belongsTo(models.User, {
                as: "updatedBy",
                foreignkey: "updatedById",
                foreignKeyConstraint: true,
            });
            CommUser.belongsTo(models.CommStatus, {
                as: "commStatus",
                foreignkey: "commStatusId",
                foreignKeyConstraint: true,
            });
            CommUser.belongsToMany(models.User, {
                through: "CommUsers",
                foreignKey: "userId",
                foreignKeyConstraint: true,
            });
            CommUser.belongsToMany(models.Comm, {
                through: "CommUsers",
                foreignKey: "commId",
                foreignKeyConstraint: true,
            });
        }
    }
    CommUser.init(
        {
            userId: DataTypes.INTEGER,
            commId: DataTypes.INTEGER,
            commStatusId: DataTypes.INTEGER,
            active: DataTypes.BOOLEAN,
            mailerResponse: DataTypes.TEXT,
            createdById: DataTypes.INTEGER,
            updatedById: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "CommUser",
        }
    );
    return CommUser;
};

export default commUser;
