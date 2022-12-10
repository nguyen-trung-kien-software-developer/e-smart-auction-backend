const wardService = require("../../services/WardService");

class WardController {
  // [GET]: /get-all-wards
  fetchAllWards = async (req, res) => {
    try {
      const wards = await wardService.getAllWards();

      if (!wards) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(wards);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  //[GET]: /show/:id
  show = async (req, res) => {
    try {
      const { id } = req.params;

      const ward = await wardService.getWardById(id);

      if (!ward) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(ward);
    } catch (error) {
      res.status(500).send(err);
    }
  };

  //[GET]: /get-ward-by-district-id/:districtId
  getWardByDistrictId = async (req, res) => {
    try {
      const { districtId } = req.params;

      const ward = await wardService.getWardByDistrictId(districtId);

      if (!ward) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(ward);
    } catch (error) {
      res.status(500).send(err);
    }
  };
}

module.exports = new WardController();
