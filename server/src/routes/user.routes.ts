import express, { Express } from "express";
import userController from "../controllers/user.controllers";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middlewares";
import { validate } from "../middlewares/validateSchema.middleware";
import { updateUserSchema } from "../validations/user.schema";
const router = express.Router();

const UserRoute = (app: Express) => {
  router.get(
    "/user-info/:id",
    authenticateToken,
    authorizeRoles("user", "employer"),
    userController.getUserInfo
  );
  router.put(
    "/update-user-info",
    validate(updateUserSchema),
    authenticateToken,
    authorizeRoles("user", "employer"),
    userController.updateUserInfo
  );

  return app.use("/api/users", router);
};

export default UserRoute;
