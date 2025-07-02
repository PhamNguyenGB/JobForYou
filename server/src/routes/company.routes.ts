import companyController from "../controllers/company.controllers";
import express, { Express } from "express";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middlewares";
import { createTokenSchema } from "../validations/company.schema";
import { validate } from "../middlewares/validateSchema.middleware";
const router = express.Router();

const CompanyRoute = (app: Express) => {
  router.get(
    "/all",
    authenticateToken,
    authorizeRoles("admin"),
    companyController.getAllCompanies
  );
  router.get("/:id", companyController.getCompanyById);
  router.post(
    "/create",
    authenticateToken,
    authorizeRoles("employer"),
    validate(createTokenSchema),
    companyController.createCompany
  );
  router.put(
    "/update",
    authenticateToken,
    authorizeRoles("employer"),
    companyController.updateCompany
  );
  router.delete(
    "/delete/:id",
    authenticateToken,
    authorizeRoles("admin"),
    companyController.deleteCompany
  );

  return app.use("/api/companies", router);
};

export default CompanyRoute;
