const firstSubCategoryService = require("../../services/FirstSubCategoryService");

class FirstSubCategoryController {
  // [GET]:
  show = async (req, res) => {
    try {
      const { slug } = req.params;
      const firstSubCategory =
        await firstSubCategoryService.getFirstSubCategoryBySlug(slug);

      if (!firstSubCategory) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(firstSubCategory);
    } catch (error) {
      res.status(500).send(err);
    }
  };
}

module.exports = new FirstSubCategoryController();
