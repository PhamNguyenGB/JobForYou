import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes interface
interface SavedJobAttributes {
  id: number;
  user_id: number;
  job_post_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the creation attributes interface
interface SavedJobCreationAttributes
  extends Optional<SavedJobAttributes, "id" | "createdAt" | "updatedAt"> {}

// Define the SavedJob model class
class SavedJob
  extends Model<SavedJobAttributes, SavedJobCreationAttributes>
  implements SavedJobAttributes
{
  public id!: number;
  public user_id!: number;
  public job_post_id!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  public static associate(models: any) {
    SavedJob.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
    SavedJob.belongsTo(models.JobPost, {
      foreignKey: "job_post_id",
      as: "jobPost",
    });
  }
}

// Export the model initialization function
export default (sequelize: Sequelize) => {
  SavedJob.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      job_post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "job_posts",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "SavedJob",
      tableName: "saved_jobs",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ["user_id"],
        },
        {
          fields: ["job_post_id"],
        },
        {
          // Unique constraint to prevent duplicate saved jobs
          fields: ["user_id", "job_post_id"],
          unique: true,
        },
      ],
    }
  );

  return SavedJob;
};
