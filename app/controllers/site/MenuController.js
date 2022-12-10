const parentCategoryService = require("../../services/ParentCategoryService");

class MenuController {
  // [GET]: /get-all-parent-categories
  fetchAllParentCategories = async (req, res) => {
    try {
      const parentCategories =
        await parentCategoryService.getAllParentCategories();

      if (!parentCategories) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(parentCategories);
    } catch (err) {
      res.status(500).send(err);
    }
  };
}

module.exports = new MenuController();
