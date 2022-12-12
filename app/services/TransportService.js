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

  getTransportList = async () => {
    let transportList = await Transport.findAll();;

    if (transportList) {
      return transportList;
    } else {
      return false;
    }
  };

  getTransportById = async (id) => {
    const transport = await Transport.findOne({
      where: {
        id,
      },
    });

    if (transport) {
      return transport;
    } else {
      return false;
    }
  };

  storeNewTransport = async (transport) => {
    let { district, price } = transport;

    const newTransport = await Transport.create({
      district_id: district,
      price
    });

    return newTransport;
  };

  updateTransportById = async (id, newTransport) => {
    const oldTransport = await this.getTransportById(id);

    if (oldTransport) {
      let { price } = newTransport;

      oldTransport.price = price;
      oldTransport.updatedAt = Date.now();

      const updatedTransport = await oldTransport.save();

      return updatedTransport;
    } else {
      return false;
    }
  };

  deleteTransportById = async (id) => {
    const oldTransport = await this.getTransportById(id);

    if (oldTransport) {
      const deletedTransport = await Transport.destroy({
        where: {
          id,
        },
      });

      return deletedTransport;
    } else {
      return false;
    }
  };
}

module.exports = new TransportService();
