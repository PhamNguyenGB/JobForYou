import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes interface
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the creation attributes (optional fields for creation)
interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

// Define the User model class
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public phone?: string;
  public role?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations here if needed
  public static associate(models: any) {
    // Example associations:
    // User.hasMany(models.Post, { foreignKey: 'userId' });
    // User.belongsTo(models.Company, { foreignKey: 'companyId' });
  }
}

// Export the model initialization function
export default (sequelize: Sequelize) => {
  User.init(
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
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isNumeric: false, // Allow international formats
          len: [10, 15],
        },
      },
      role: {
        type: DataTypes.ENUM("user", "admin", "moderator"),
        allowNull: true,
        defaultValue: "user",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      underscored: true, // Use snake_case for database columns
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
        {
          fields: ["role"],
        },
      ],
      hooks: {
        // Example: Hash password before saving
        beforeCreate: async (user: User) => {
          // You can add password hashing logic here
          // const bcrypt = require('bcrypt');
          // user.password = await bcrypt.hash(user.password, 10);
        },
        beforeUpdate: async (user: User) => {
          // Hash password if it's being updated
          // if (user.changed('password')) {
          //   const bcrypt = require('bcrypt');
          //   user.password = await bcrypt.hash(user.password, 10);
          // }
        },
      },
    }
  );

  return User;
};
