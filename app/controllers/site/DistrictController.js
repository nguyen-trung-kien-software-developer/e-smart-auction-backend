const districtService = require("../../services/DistrictService");

class DistrictController {
  // [GET]: /get-all-districts
  fetchAllDistricts = async (req, res) => {
    try {
      const districts = await districtService.getAllDistricts();

      if (!districts) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(districts);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  //[GET]: /show/:id
  show = async (req, res) => {
    try {
      const { id } = req.params;

      const district = await districtService.getDistrictById(id);

      if (!district) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(district);
    } catch (error) {
      res.status(500).send(err);
    }
  };

  //[GET]: /get-district-by-province-id/:provinceId
  getDistrictByProvinceId = async (req, res) => {
    try {
      const { provinceId } = req.params;

      const district = await districtService.getDistrictByProvinceId(provinceId);

      if (!district) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(district);
    } catch (error) {
      res.status(500).send(err);
    }
  };
}

module.exports = new DistrictController();
