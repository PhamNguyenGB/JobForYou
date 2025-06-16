import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes interface
interface JobPostAttributes {
  id: number;
  company_id: number;
  title: string;
  description: string;
  salary?: string;
  skills?: string;
  benefits?: string;
  deadline: Date;
  quantity?: number;
  user_id?: number;
  education?: string;
  status: string;
  category_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the creation attributes
interface JobPostCreationAttributes
  extends Optional<JobPostAttributes, "id" | "createdAt" | "updatedAt"> {}

// Define the JobPost model class
class JobPost
  extends Model<JobPostAttributes, JobPostCreationAttributes>
  implements JobPostAttributes
{
  public id!: number;
  public company_id!: number;
  public title!: string;
  public description!: string;
  public salary?: string;
  public benefits?: string;
  public deadline!: Date;
  public skills?: string;
  public education?: string;
  public quantity?: number;
  public status!: string;
  public user_id?: number;
  public category_id?: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  public static associate(models: any) {
    JobPost.belongsTo(models.Company, { foreignKey: "company_id" });
    JobPost.belongsTo(models.JobCategory, { foreignKey: "category_id" });
    JobPost.belongsToMany(models.Level, {
      through: models.JobPostLevel,
      foreignKey: "job_post_id",
      otherKey: "level_id",
    });
    JobPost.hasMany(models.Application, { foreignKey: "job_post_id" });
    JobPost.hasOne(models.SavedJob, { foreignKey: "job_post_id" });
    JobPost.belongsToMany(models.District, {
      through: models.JobPostDistrict,
      foreignKey: "job_post_id",
      otherKey: "district_id",
    });
  }
}

// Export the model initialization function
export default (sequelize: Sequelize) => {
  JobPost.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "companies",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [5, 200],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      salary: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      skills: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      benefits: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          isAfter: new Date().toISOString(),
        },
      },
      education: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("draft", "published", "closed", "expired"),
        allowNull: false,
        defaultValue: "draft",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "job_categories",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "JobPost",
      tableName: "job_posts",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ["company_id"],
        },
        {
          fields: ["category_id"],
        },
        {
          fields: ["status"],
        },
        {
          fields: ["deadline"],
        },
      ],
    }
  );

  return JobPost;
};
