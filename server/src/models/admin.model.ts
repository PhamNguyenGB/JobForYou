import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes interface
interface AdminAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the creation attributes
interface AdminCreationAttributes
  extends Optional<AdminAttributes, "id" | "createdAt" | "updatedAt"> {}

// Define the Admin model class
class Admin
  extends Model<AdminAttributes, AdminCreationAttributes>
  implements AdminAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  public static associate(models: any) {
    // Admin associations if needed
    Admin.hasMany(models.TokenModel, { foreignKey: "admin_id" });
  }
}

// Export the model initialization function
export default (sequelize: Sequelize) => {
  Admin.init(
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
          len: [2, 100],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [6, 255],
        },
      },
    },
    {
      sequelize,
      modelName: "Admin",
      tableName: "admins",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
      ],
      hooks: {
        beforeCreate: async (admin: Admin) => {
          // Add password hashing logic here
        },
        beforeUpdate: async (admin: Admin) => {
          // Hash password if it's being updated
        },
      },
    }
  );

  return Admin;
};
