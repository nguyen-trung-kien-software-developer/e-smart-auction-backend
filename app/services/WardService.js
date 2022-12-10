const { Ward } = require("../../models");

class WardService {
  getAllWards = async () => {
    try {
      const wards = await Ward.findAll({});

      if (!wards) {
        return false;
      }

      return wards;
    } catch (err) {
      return false;
    }
  };

  getWardById = async (id) => {
    try {
      const ward = await Ward.findOne({
        where: {
          id,
        },
      });

      if (!ward) {
        return false;
      }

      return ward;
    } catch (error) {
      return false;
    }
  };

  getWardByDistrictId = async (districtId) => {
    try {
      const ward = await Ward.findAll({
        where: {
          district_id: districtId,
        },
        // include: [
        //   {
        //     model: Ward,
        //     as: "wards",
        //   },
        // ],
      });

      if (!ward) {
        return false;
      }

      return ward;
    } catch (error) {
      return false;
    }
  };
}

module.exports = new WardService();
