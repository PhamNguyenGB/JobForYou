import express, { Express } from "express";
import * as userController from "../controllers/user.controllers";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middlewares";

const router = express.Router();

const UserRoute = (app: Express) => {
  router.get(
    "/user-info/:id",
    authenticateToken,
    authorizeRoles("user", "employer"),
    userController.getUserInfo
  );
  router.put("/update-user-info", userController.updateUserInfo);

  return app.use("/api/users", router);
};

export default UserRoute;
