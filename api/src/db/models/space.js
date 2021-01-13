import { Model } from "sequelize";

const space = (sequelize, DataTypes) => {
    class Space extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Space.belongsTo(models.User, {
                as: "createdBy",
                foreignkey: "createdById",
                foreignKeyConstraint: true,
            });
            Space.belongsTo(models.User, {
                as: "updatedBy",
                foreignkey: "updatedById",
                foreignKeyConstraint: true,
            });
        }
    }
    Space.init(
        {
            displayName: DataTypes.STRING,
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            location: "public.geometry(Point, 4326)",
            private: DataTypes.BOOLEAN,
            address: DataTypes.STRING,
            address2: DataTypes.STRING,
            city: DataTypes.STRING,
            state: DataTypes.STRING,
            zip: DataTypes.STRING,
            phone: DataTypes.STRING,
            cell: DataTypes.STRING,
            email: DataTypes.STRING,
            webPresence: DataTypes.STRING,
            verified: DataTypes.BOOLEAN,
            active: DataTypes.BOOLEAN,
            createdById: DataTypes.INTEGER,
            updatedById: DataTypes.INTEGER,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Space",
        }
    );
    return Space;
};

export default space;
