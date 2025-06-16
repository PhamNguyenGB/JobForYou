import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes interface
interface JobPostDistrictAttributes {
  id: number;
  job_post_id: number;
  district_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the creation attributes interface
interface JobPostDistrictCreationAttributes
  extends Optional<
    JobPostDistrictAttributes,
    "id" | "createdAt" | "updatedAt"
  > {}

// Define the JobPostDistrict model class
class JobPostDistrict
  extends Model<JobPostDistrictAttributes, JobPostDistrictCreationAttributes>
  implements JobPostDistrictAttributes
{
  public id!: number;
  public job_post_id!: number;
  public district_id!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  public static associate(models: any) {
    JobPostDistrict.belongsTo(models.JobPost, {
      foreignKey: "job_post_id",
      as: "jobPost",
    });
    JobPostDistrict.belongsTo(models.District, {
      foreignKey: "district_id",
      as: "district",
    });
  }
}

// Export the model initialization function
export default (sequelize: Sequelize) => {
  JobPostDistrict.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      job_post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "job_posts",
          key: "id",
        },
      },
      district_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "districts",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "JobPostDistrict",
      tableName: "job_post_districts",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ["job_post_id"],
        },
        {
          fields: ["district_id"],
        },
        {
          // Unique constraint to prevent duplicate job_post-district relationships
          fields: ["job_post_id", "district_id"],
          unique: true,
        },
      ],
    }
  );

  return JobPostDistrict;
};
