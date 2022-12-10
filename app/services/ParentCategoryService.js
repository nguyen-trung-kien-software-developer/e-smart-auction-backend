// const HttpError = require("../../models/http-error");
const {
  ParentCategory,
  FirstSubCategory,
  SecondSubCategory,
  Product,
} = require("../../models");

class ParentCategoryService {
  getAllParentCategories = async () => {
    try {
      const parentCategories = await ParentCategory.findAll({
        include: [
          {
            model: FirstSubCategory,
            as: "firstSubCategories",
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
          },
        ],
      });

      if (!parentCategories) {
        return false;
      }

      return parentCategories;
    } catch (err) {
      return false;
    }
  };

  getParentCategoryBySlug = async (slug) => {
    try {
      const parentCategory = await ParentCategory.findOne({
        where: {
          slug: slug,
        },
        include: [
          {
            model: FirstSubCategory,
            as: "firstSubCategories",
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
          },
        ],
      });

      if (!parentCategory) {
        return false;
      }

      return parentCategory;
    } catch (error) {
      return false;
    }
  };
}

module.exports = new ParentCategoryService();
