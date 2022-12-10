const { Size } = require("../../models");

class SizeService {
  getAllSizes = async () => {
    try {
      const sizes = await Size.findAll({});

      if (!sizes) {
        return false;
      }

      return sizes;
    } catch (err) {
      return false;
    }
  };
}

module.exports = new SizeService();
