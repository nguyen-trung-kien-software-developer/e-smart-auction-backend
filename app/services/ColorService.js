const { Color } = require("../../models");

class ColorService {
  getAllColors = async () => {
    try {
      const colors = await Color.findAll({});

      if (!colors) {
        return false;
      }

      return colors;
    } catch (err) {
      return false;
    }
  };
}

module.exports = new ColorService();
