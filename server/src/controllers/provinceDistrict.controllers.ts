import provinceDistrictServices from "../services/provinceDistrict.services";
import { Request, Response } from "express";

export class ProvinceDistrictController {
  getProvinces = async (req: Request, res: Response) => {
    const provinces = await provinceDistrictServices.getProvinces();
    res.json(provinces);
    return;
  };

  getDistricts = async (req: Request, res: Response) => {
    const provinceId = Number(req.params.provinceId);
    const districts = await provinceDistrictServices.getDistricts(provinceId);
    res.json(districts);
    return;
  };
}

const provinceDistrictController = new ProvinceDistrictController();
export default provinceDistrictController;
