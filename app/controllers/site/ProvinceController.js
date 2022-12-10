const provinceService = require("../../services/ProvinceService");

class ProvinceController {
  // [GET]: /get-all-provinces
  fetchAllProvinces = async (req, res) => {
    try {
      const provinces = await provinceService.getAllProvinces();

      if (!provinces) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(provinces);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  //[GET]: /show/:id
  show = async (req, res) => {
    try {
      const { id } = req.params;

      const province = await provinceService.getProvinceById(id);

      if (!province) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(province);
    } catch (error) {
      res.status(500).send(err);
    }
  };
}

module.exports = new ProvinceController();
