import models from "../models";

export class ProvinceDistrictRepo {
  getProvinces = async () => {
    try {
      const provinces = await models.ProvinceModel.findAll();
      return provinces;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  getDistricts = async (provinceId: number) => {
    try {
      const districts = await models.DistrictModel.findAll({
        where: { province_id: provinceId },
      });
      return districts;
    } catch (error) {
      console.log(error);
      return;
    }
  };
}

const provinceDistrictRepo = new ProvinceDistrictRepo();
export default provinceDistrictRepo;
