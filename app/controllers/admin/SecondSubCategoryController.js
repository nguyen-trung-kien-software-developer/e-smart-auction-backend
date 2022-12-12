const secondSubCategoryService = require("../../services/SecondSubCategoryService");

class SecondSubCategoryController {
  index = async (req, res) => {
    const { name } = req.query;

    try {
      const secondSubCategoryList = await secondSubCategoryService.getSecondSubCategoryList(name);

      if (!secondSubCategoryList) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(secondSubCategoryList);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  store = async (req, res) => {
    const secondSubCategory = req.body;

    try {
      const createdSecondSubCategory = await secondSubCategoryService.storeNewSecondSubCategory(
        secondSubCategory
      );

      res.status(201).send(createdSecondSubCategory);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  edit = async (req, res) => {
    const { id } = req.params;

    try {
      const secondSubCategory = await secondSubCategoryService.getSecondSubCategoryById(id);

      if (!secondSubCategory) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(secondSubCategory);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const newSecondSubCategory = req.body;

    try {
      const updatedSecondSubCategory = await secondSubCategoryService.updateSecondSubCategoryById(
        id,
        newSecondSubCategory
      );

      if (!updatedSecondSubCategory) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(updatedSecondSubCategory);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  destroy = async (req, res) => {
    const { id } = req.params;

    try {
      const deletedSecondSubCategory = await secondSubCategoryService.deleteSecondSubCategoryById(id);

      if (!deletedSecondSubCategory) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send("Deleted SecondSubCategory Successfully !");
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

module.exports = new SecondSubCategoryController();
