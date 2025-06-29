import models from "../models";

export const getProvinces = async () => {
  try {
    const provinces = await models.ProvinceModel.findAll();
    return provinces;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getDistricts = async (provinceId: number) => {
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
