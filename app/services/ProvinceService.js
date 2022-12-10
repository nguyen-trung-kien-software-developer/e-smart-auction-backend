const { Province, District, Ward } = require("../../models");

class ProvinceService {
  getAllProvinces = async () => {
    try {
      const provinces = await Province.findAll({});

      if (!provinces) {
        return false;
      }

      return provinces;
    } catch (err) {
      return false;
    }
  };

  getProvinceById = async (id) => {
    try {
      const province = await Province.findOne({
        where: {
          id,
        },
        include: [
          {
            model: District,
            as: "districts",
            include: [
              {
                model: Ward,
                as: "wards",
              },
            ],
          },
        ],
      });

      if (!province) {
        return false;
      }

      return province;
    } catch (error) {
      return false;
    }
  };
}

module.exports = new ProvinceService();
