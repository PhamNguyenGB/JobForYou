import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes interface
interface JobPostSkillAttributes {
  id: number;
  job_post_id: number;
  level_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the creation attributes interface
interface JobPostSkillCreationAttributes
  extends Optional<JobPostSkillAttributes, "id" | "createdAt" | "updatedAt"> {}

// Define the JobPostLevel model class
class JobPostLevel
  extends Model<JobPostSkillAttributes, JobPostSkillCreationAttributes>
  implements JobPostSkillAttributes
{
  public id!: number;
  public job_post_id!: number;
  public level_id!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  public static associate(models: any) {
    JobPostLevel.belongsTo(models.JobPost, {
      foreignKey: "job_post_id",
    });
    JobPostLevel.belongsTo(models.Skill, {
      foreignKey: "level_id",
    });
  }
}

// Export the model initialization function
export default (sequelize: Sequelize) => {
  JobPostLevel.init(
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
      level_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "skills",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "JobPostLevel",
      tableName: "job_post_levels",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ["job_post_id"],
        },
        {
          fields: ["level_id"],
        },
        {
          // Unique constraint to prevent duplicate job_post-skill relationships
          fields: ["job_post_id", "level_id"],
          unique: true,
        },
      ],
    }
  );

  return JobPostLevel;
};
