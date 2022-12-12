const firstSubCategoryService = require("../../services/FirstSubCategoryService");

class FirstSubCategoryController {
  index = async (req, res) => {
    const { name } = req.query;

    try {
      const firstSubCategoryList = await firstSubCategoryService.getFirstSubCategoryList(name);

      if (!firstSubCategoryList) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(firstSubCategoryList);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  store = async (req, res) => {
    const firstSubCategory = req.body;

    try {
      const createdFirstSubCategory = await firstSubCategoryService.storeNewFirstSubCategory(
        firstSubCategory
      );

      if(!createdFirstSubCategory) {
        res.status(404).send("NOT FOUND!!!");
        return;
      }

      res.status(201).send(createdFirstSubCategory);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  edit = async (req, res) => {
    const { id } = req.params;

    try {
      const firstSubCategory = await firstSubCategoryService.getFirstSubCategoryById(id);

      if (!firstSubCategory) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(firstSubCategory);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const newFirstSubCategory = req.body;

    try {
      const updatedFirstSubCategory = await firstSubCategoryService.updateFirstSubCategoryById(
        id,
        newFirstSubCategory
      );

      if (!updatedFirstSubCategory) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(updatedFirstSubCategory);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  destroy = async (req, res) => {
    const { id } = req.params;

    try {
      const deletedFirstSubCategory = await firstSubCategoryService.deleteFirstSubCategoryById(id);

      if (!deletedFirstSubCategory) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send("Deleted FirstSubCategory Successfully !");
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

module.exports = new FirstSubCategoryController();
