import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes interface
interface JobCategoryAttributes {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the creation attributes
interface JobCategoryCreationAttributes
  extends Optional<JobCategoryAttributes, "id" | "createdAt" | "updatedAt"> {}

// Define the JobCategory model class
class JobCategory
  extends Model<JobCategoryAttributes, JobCategoryCreationAttributes>
  implements JobCategoryAttributes
{
  public id!: number;
  public name!: string;
  public description?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  public static associate(models: any) {
    JobCategory.hasMany(models.JobPost, { foreignKey: "category_id" });
  }
}

// Export the model initialization function
export default (sequelize: Sequelize) => {
  JobCategory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: [2, 100],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "JobCategory",
      tableName: "job_categories",
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

  return JobCategory;
};
