import provinceDistrictRepo from "../repo/provinceDistrict.repo";

export class ProvinceDistrictServices {
  getProvinces = async () => {
    try {
      const provinces = await provinceDistrictRepo.getProvinces();
      return provinces;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  getDistricts = async (provinceId: number) => {
    try {
      const districts = await provinceDistrictRepo.getDistricts(provinceId);
      return districts;
    } catch (error) {
      console.log(error);
      return;
    }
  };
}

const provinceDistrictServices = new ProvinceDistrictServices();
export default provinceDistrictServices;
