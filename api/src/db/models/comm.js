import { Model } from "sequelize";

const comm = (sequelize, DataTypes) => {
    class Comm extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Comm.belongsTo(models.User, {
                as: "createdBy",
                foreignkey: "createdById",
                foreignKeyConstraint: true,
            });
            Comm.belongsTo(models.User, {
                as: "updatedBy",
                foreignkey: "updatedById",
                foreignKeyConstraint: true,
            });
            Comm.belongsTo(models.CommType, {
                as: "commType",
                foreignkey: "commTypeId",
                foreignKeyConstraint: true,
            });
        }
    }
    Comm.init(
        {
            displayName: DataTypes.STRING,
            description: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
            commTypeId: DataTypes.INTEGER,
            createdById: DataTypes.INTEGER,
            updatedById: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Comm",
        }
    );
    return Comm;
};

export default comm;
