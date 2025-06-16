import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes interface
interface CompanyAttributes {
  id: number;
  name: string;
  description?: string;
  address?: string;
  avatar?: string;
  link_website?: string;
  members?: string;
  admin_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the creation attributes
interface CompanyCreationAttributes
  extends Optional<CompanyAttributes, "id" | "createdAt" | "updatedAt"> {}

// Define the Company model class
class Company
  extends Model<CompanyAttributes, CompanyCreationAttributes>
  implements CompanyAttributes
{
  public id!: number;
  public name!: string;
  public description?: string;
  public address?: string;
  public avatar?: string;
  public link_website?: string;
  public members?: string;
  public admin_id?: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  public static associate(models: any) {
    Company.belongsTo(models.Admin, { foreignKey: "admin_id" });
    Company.hasMany(models.JobPost, { foreignKey: "company_id" });
  }
}

// Export the model initialization function
export default (sequelize: Sequelize) => {
  Company.init(
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
          len: [2, 200],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      link_website: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      members: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Company",
      tableName: "companies",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ["name"],
        },
        {
          fields: ["admin_id"],
        },
      ],
    }
  );

  return Company;
};
