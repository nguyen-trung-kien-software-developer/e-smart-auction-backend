const parentCategoryService = require("../../services/ParentCategoryService");

class ParentCategoryController {
  index = async (req, res) => {
    const { name } = req.query;

    try {
      const parentCategoryList = await parentCategoryService.getParentCategoryList(name);

      if (!parentCategoryList) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(parentCategoryList);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  store = async (req, res) => {
    const parentCategory = req.body;

    try {
      const createdParentCategory = await parentCategoryService.storeNewParentCategory(
        parentCategory
      );

      res.status(201).send(createdParentCategory);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  edit = async (req, res) => {
    const { id } = req.params;

    try {
      const parentCategory = await parentCategoryService.getParentCategoryById(id);

      if (!parentCategory) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(parentCategory);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const newParentCategory = req.body;

    try {
      const updatedParentCategory = await parentCategoryService.updateParentCategoryById(
        id,
        newParentCategory
      );

      if (!updatedParentCategory) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(updatedParentCategory);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  destroy = async (req, res) => {
    try {
      const { id } = req.params;
     
      const deletedParentCategory = await parentCategoryService.deleteParentCategoryById(id);

      if (!deletedParentCategory) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send("Deleted ParentCategory Successfully !");
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

module.exports = new ParentCategoryController();
