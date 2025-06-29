import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes interface
interface SkillAttributes {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the creation attributes
interface SkillCreationAttributes
  extends Optional<SkillAttributes, "id" | "createdAt" | "updatedAt"> {}

// Define the Level model class
class Level
  extends Model<SkillAttributes, SkillCreationAttributes>
  implements SkillAttributes
{
  public id!: number;
  public name!: string;
  public description?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  public static associate(models: any) {
    Level.belongsToMany(models.JobPostModel, {
      through: models.JobPostLevelModel,
      foreignKey: "level_id",
      otherKey: "job_post_id",
    });
  }
}

// Export the model initialization function
export default (sequelize: Sequelize) => {
  Level.init(
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
      modelName: "Level",
      tableName: "levels",
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

  return Level;
};
