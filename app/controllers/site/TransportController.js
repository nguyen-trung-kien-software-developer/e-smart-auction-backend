const transportService = require("../../services/TransportService");

class TransportController {
  // [GET]: /get-transport-by-district-id/:districtId
  getTransportByDistrictId = async (req, res) => {
    try {
        const { districtId } = req.params;

      const transport = await transportService.getTransportByDistrictId(districtId);

      if (!transport) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(transport);
    } catch (err) {
      res.status(500).send(err);
    }
  };
}

module.exports = new TransportController();
