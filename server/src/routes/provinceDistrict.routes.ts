import provinceDistrictController from "../controllers/provinceDistrict.controllers";
import express, { Express } from "express";

const router = express.Router();

const ProvinceDistrictRoute = (app: Express) => {
  router.get("/provinces", provinceDistrictController.getProvinces);
  router.get("/districts/:provinceId", provinceDistrictController.getDistricts);

  return app.use("/api/provinces-districts", router);
};

export default ProvinceDistrictRoute;
