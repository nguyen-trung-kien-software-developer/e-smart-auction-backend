const { District, Ward } = require("../../models");

class DistrictService {
  getAllDistricts = async () => {
    try {
      const districts = await District.findAll({});

      if (!districts) {
        return false;
      }

      return districts;
    } catch (err) {
      return false;
    }
  };

  getDistrictById = async (id) => {
    try {
      const district = await District.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Ward,
            as: "wards",
          },
        ],
      });

      if (!district) {
        return false;
      }

      return district;
    } catch (error) {
      return false;
    }
  };

  getDistrictByProvinceId = async (provinceId) => {
    try {
      const district = await District.findAll({
        where: {
          province_id: provinceId,
        },
        // include: [
        //   {
        //     model: Ward,
        //     as: "wards",
        //   },
        // ],
      });

      if (!district) {
        return false;
      }

      return district;
    } catch (error) {
      return false;
    }
  };
}

module.exports = new DistrictService();
