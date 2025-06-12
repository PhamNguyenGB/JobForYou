import express from "express";
import cors from "cors";
import sequelize from "./config/db.config";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Server is running!",
    timestamp: new Date().toISOString(),
  });
});

export default app;
