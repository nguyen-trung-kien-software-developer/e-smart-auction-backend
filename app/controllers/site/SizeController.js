const sizeService = require("../../services/SizeService");

class SizeController {
  // [GET]: /get-all-sizes
  fetchAllSizes = async (req, res) => {
    try {
      const sizes = await sizeService.getAllSizes();

      if (!sizes) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(sizes);
    } catch (err) {
      res.status(500).send(err);
    }
  };
}

module.exports = new SizeController();
