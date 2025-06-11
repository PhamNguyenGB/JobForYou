// models/index.ts
import User from "./user.model";
// Import thêm models khác khi tạo
// import Product from './product.model';
// import Category from './category.model';
// import Order from './order.model';

// Khởi tạo database connection và sync models
import sequelize from "../config/database";

// Test connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
};

// Sync models với database
const syncModels = async () => {
  try {
    await sequelize.sync({ force: false }); // force: true sẽ drop tables
    console.log("All models synced successfully.");
  } catch (error) {
    console.error("Error syncing models:", error);
  }
};

// Định nghĩa relationships/associations ở đây (nếu có)
// Ví dụ:
// User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
// Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
// Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

// Export models
export {
  User,
  // Product,
  // Category,
  // Order,
};

// Export utility functions
export { sequelize, testConnection, syncModels };

// Export default object nếu muốn
export default {
  User,
  // Product,
  // Category,
  // Order,
  sequelize,
  testConnection,
  syncModels,
};
