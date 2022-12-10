const { Transport } = require("../../models");

class TransportService {
    getTransportByDistrictId = async (districtId) => {
    try {
      const transport = await Transport.findOne({
        where: {
            district_id: districtId
        }
      });

      if (!transport) {
        return false;
      }

      return transport;
    } catch (err) {
      return false;
    }
  };
}

module.exports = new TransportService();
