const transportService = require("../../services/TransportService");

class TransportController {
  index = async (req, res) => {

    try {
      const transportList = await transportService.getTransportList();

      if (!transportList) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(transportList);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  store = async (req, res) => {
    const transport = req.body;

    try {
      const createdTransport = await transportService.storeNewTransport(
        transport
      );

      res.status(201).send(createdTransport);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  edit = async (req, res) => {
    const { id } = req.params;

    try {
      const transport = await transportService.getTransportById(id);

      if (!transport) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(transport);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const newTransport = req.body;

    try {
      const updatedTransport = await transportService.updateTransportById(
        id,
        newTransport
      );

      if (!updatedTransport) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(updatedTransport);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  destroy = async (req, res) => {
    const { id } = req.params;

    try {
      const deletedTransport = await transportService.deleteTransportById(id);

      if (!deletedTransport) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send("Deleted Transport Successfully !");
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

module.exports = new TransportController();
