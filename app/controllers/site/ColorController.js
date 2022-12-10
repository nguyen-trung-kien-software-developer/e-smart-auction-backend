const colorService = require("../../services/ColorService");

class ColorController {
  // [GET]: /get-all-colors
  fetchAllColors = async (req, res) => {
    try {
      const colors = await colorService.getAllColors();

      if (!colors) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(colors);
    } catch (err) {
      res.status(500).send(err);
    }
  };
}

module.exports = new ColorController();
