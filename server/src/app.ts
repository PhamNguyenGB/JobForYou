import express from "express";
import { sequelize } from "./models";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/files_cv", express.static("src/assets/files_cv"));

routes(app);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});
