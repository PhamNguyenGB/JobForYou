import express, { Express } from "express";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middlewares";
import profileController from "../controllers/profile.controllers";
import upload from "../middlewares/uploadFile.middleware";
import { validate } from "../middlewares/validateSchema.middleware";
import { createProfileSchema } from "../validations/profile.schema";

const router = express.Router();

const ProfileRoute = (app: Express) => {
  router.get(
    "/profile/:id",
    authenticateToken,
    authorizeRoles("user"),
    profileController.getProfile
  );
  router.put(
    "/update-profile",
    authenticateToken,
    authorizeRoles("user"),
    upload.single("cv_file"),
    profileController.updateProfile
  );
  router.post(
    "/create-profile",
    authenticateToken,
    authorizeRoles("user"),
    validate(createProfileSchema),
    upload.single("cv_file"),
    profileController.createProfile
  );

  return app.use("/api/profiles", router);
};

export default ProfileRoute;
