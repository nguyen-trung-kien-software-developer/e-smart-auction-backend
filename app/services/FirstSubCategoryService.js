const {
  FirstSubCategory,
  SecondSubCategory,
  Product,
} = require("../../models");

class FirstSubCategoryService {
  async getOneProductByFirstSubCategoryId(firstSubCategory_id) {
    try {
      const firstSubCategory = await FirstSubCategory.findOne({
        where: {
          id: firstSubCategory_id,
        },
        include: [
          {
            model: SecondSubCategory,
            as: "secondSubCategories",
            include: [
              {
                model: Product,
                as: "products",
              },
            ],
          },
        ],
      });

      if (!firstSubCategory) {
        return false;
      }

      const secondSubCategory = firstSubCategory?.secondSubCategories[0];

      const product = secondSubCategory?.products[0];

      return product;
    } catch (error) {
      return false;
    }
  }

  getFirstSubCategoryBySlug = async (slug) => {
    try {
      const firstSubCategory = await FirstSubCategory.findOne({
        where: {
          slug: slug,
        },
        include: [
          {
            model: SecondSubCategory,
            as: "secondSubCategories",
            include: [
              {
                model: Product,
                as: "products",
              },
            ],
          },
        ],
      });

      if (!firstSubCategory) {
        return false;
      }

      return firstSubCategory;
    } catch (error) {
      return false;
    }
  };
}

module.exports = new FirstSubCategoryService();
