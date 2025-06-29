import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes interface
interface DistrictAttributes {
  id: number;
  province_id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the creation attributes
interface DistrictCreationAttributes
  extends Optional<DistrictAttributes, "id" | "createdAt" | "updatedAt"> {}

// Define the District model class
class District
  extends Model<DistrictAttributes, DistrictCreationAttributes>
  implements DistrictAttributes
{
  public id!: number;
  public province_id!: string;
  public name!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  public static associate(models: any) {
    District.belongsTo(models.ProvinceModel, { foreignKey: "province_id" });
    District.belongsToMany(models.JobPostModel, {
      through: models.JobPostDistrictModel,
      foreignKey: "district_id",
      otherKey: "job_post_id",
    });
  }
}

// Export the model initialization function
export default (sequelize: Sequelize) => {
  District.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      province_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "provinces",
          key: "province_id",
        },
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
      modelName: "District",
      tableName: "districts",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ["province_id"],
        },
      ],
    }
  );

  return District;
};
