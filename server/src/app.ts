import express from "express";
import cors from "cors";
import { testConnection, syncModels } from "./models";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/users");

app.get("/", (req, res) => {
  res.json({
    message: "Server is running!",
    timestamp: new Date().toISOString(),
  });
});

// Database initialization và start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();

    // Sync models
    await syncModels();

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Start the application
startServer();
export default app;
