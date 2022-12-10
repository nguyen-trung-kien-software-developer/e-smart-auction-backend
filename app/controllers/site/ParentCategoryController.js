const parentCategoryService = require("../../services/ParentCategoryService");

class ParentCategoryController {
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

  // [GET]: /get-parent-category
  show = async (req, res) => {
    try {
      const { slug } = req.params;
      const parentCategory =
        await parentCategoryService.getParentCategoryBySlug(slug);

      if (!parentCategory) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(parentCategory);
    } catch (error) {
      res.status(500).send(err);
    }
  };
}

module.exports = new ParentCategoryController();
