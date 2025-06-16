import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes interface
interface ProfileAttributes {
  id: number;
  user_id: number;
  gender?: string;
  phone?: string;
  cv_file?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the creation attributes
interface ProfileCreationAttributes
  extends Optional<ProfileAttributes, "id" | "createdAt" | "updatedAt"> {}

// Define the Profile model class
class Profile
  extends Model<ProfileAttributes, ProfileCreationAttributes>
  implements ProfileAttributes
{
  public id!: number;
  public user_id!: number;
  public gender?: string;
  public phone?: string;
  public cv_file?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  public static associate(models: any) {
    Profile.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

// Export the model initialization function
export default (sequelize: Sequelize) => {
  Profile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      gender: {
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [10, 15],
        },
      },
      cv_file: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Profile",
      tableName: "profiles",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["user_id"],
        },
      ],
    }
  );

  return Profile;
};
