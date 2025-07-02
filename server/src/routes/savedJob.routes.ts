import savedJobController from "../controllers/savedJob.controllers";
import express, { Express } from "express";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middlewares";

const router = express.Router();

const SavedJobRoute = (app: Express) => {
  router.get(
    "/all",
    authenticateToken,
    authorizeRoles("user"),
    savedJobController.getSavedJob
  );
  router.post(
    "/create",
    authenticateToken,
    authorizeRoles("user"),
    savedJobController.createSavedJob
  );
  router.delete(
    "/delete",
    authenticateToken,
    authorizeRoles("user"),
    savedJobController.deleteSavedJob
  );

  return app.use("/api/saved-job", router);
};

export default SavedJobRoute;
