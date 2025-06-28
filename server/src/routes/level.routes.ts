import * as levelController from "../controllers/level.controllers";
import express, { Express } from "express";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middlewares";

const router = express.Router();

const LevelRoute = (app: Express) => {
  router.get("/all", levelController.getAllLevels);
  router.post(
    "/create",
    authenticateToken,
    authorizeRoles("employer", "admin"),
    levelController.createLevel
  );
  router.delete(
    "/delete/:id",
    authenticateToken,
    authorizeRoles("employer", "admin"),
    levelController.deleteLevel
  );

  return app.use("/api/levels", router);
};

export default LevelRoute;
