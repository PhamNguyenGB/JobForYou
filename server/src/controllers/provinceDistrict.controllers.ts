import * as provinceDistrictServices from "../services/ProvinceDistrict.services";
import { Request, Response } from "express";

export const getProvinces = async (req: Request, res: Response) => {
  const provinces = await provinceDistrictServices.getProvinces();
  res.json(provinces);
  return;
};

export const getDistricts = async (req: Request, res: Response) => {
  const provinceId = Number(req.params.provinceId);
  const districts = await provinceDistrictServices.getDistricts(provinceId);
  res.json(districts);
  return;
};
