import { DataTypes, Model, Optional, Sequelize } from "sequelize";

// Define the attributes interface
interface TokenAttributes {
  id: number;
  user_id?: number;
  admin_id?: number;
  refresh_token: string;
  type: string;
  is_revoked: boolean;
  expires_at: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the creation attributes
interface TokenCreationAttributes
  extends Optional<TokenAttributes, "id" | "createdAt" | "updatedAt"> {}

// Define the Token model class
class Token
  extends Model<TokenAttributes, TokenCreationAttributes>
  implements TokenAttributes
{
  public id!: number;
  public user_id?: number;
  public admin_id?: number;
  public refresh_token!: string;
  public type!: string;
  public expires_at!: Date;
  public is_revoked!: boolean;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  public static associate(models: any) {
    Token.belongsTo(models.UserModel, { foreignKey: "user_id" });
    Token.belongsTo(models.AdminModel, { foreignKey: "admin_id" });
  }
}

// Export the model initialization function
export default (sequelize: Sequelize) => {
  Token.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "admins",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      refresh_token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_revoked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Token",
      tableName: "tokens",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ["user_id"],
        },
        {
          fields: ["admin_id"],
        },
      ],
    }
  );

  return Token;
};
