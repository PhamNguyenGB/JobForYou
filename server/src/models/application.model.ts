import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes interface
interface ApplicationAttributes {
  id: number;
  user_id: number;
  job_post_id: number;
  status: string;
  file_cv?: string;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the creation attributes
interface ApplicationCreationAttributes
  extends Optional<ApplicationAttributes, "id" | "createdAt" | "updatedAt"> {}

// Define the Application model class
class Application
  extends Model<ApplicationAttributes, ApplicationCreationAttributes>
  implements ApplicationAttributes
{
  public id!: number;
  public user_id!: number;
  public job_post_id!: number;
  public status!: string;
  public file_cv?: string;
  public note?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  public static associate(models: any) {
    Application.belongsTo(models.User, { foreignKey: "user_id" });
    Application.belongsTo(models.JobPost, { foreignKey: "job_post_id" });
  }
}

// Export the model initialization function
export default (sequelize: Sequelize) => {
  Application.init(
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
        onDelete: "CASCADE",
      },
      job_post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "job_posts",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      status: {
        type: DataTypes.ENUM(
          "pending",
          "reviewed",
          "shortlisted",
          "rejected",
          "accepted"
        ),
        allowNull: false,
        defaultValue: "pending",
      },
      file_cv: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Application",
      tableName: "applications",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["user_id", "job_post_id"],
        },
        {
          fields: ["user_id"],
        },
        {
          fields: ["job_post_id"],
        },
        {
          fields: ["status"],
        },
      ],
    }
  );

  return Application;
};
