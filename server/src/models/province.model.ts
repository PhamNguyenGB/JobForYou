import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes interface
interface ProvinceAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the creation attributes
interface ProvinceCreationAttributes
  extends Optional<ProvinceAttributes, "id" | "createdAt" | "updatedAt"> {}

// Define the Province model class
class Province
  extends Model<ProvinceAttributes, ProvinceCreationAttributes>
  implements ProvinceAttributes
{
  public id!: number;
  public name!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  public static associate(models: any) {
    Province.hasMany(models.DistrictModel, {
      foreignKey: "province_id",
    });
  }
}

// Export the model initialization function
export default (sequelize: Sequelize) => {
  Province.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Province",
      tableName: "provinces",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["name"],
        },
      ],
    }
  );

  return Province;
};
