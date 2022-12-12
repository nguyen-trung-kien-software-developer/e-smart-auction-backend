// const HttpError = require("../../models/http-error");
const {
  ParentCategory,
  FirstSubCategory,
  SecondSubCategory,
  Product,
} = require("../../models");
const {stringToSlug} = require("../../utils/strHanlder");

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

  getParentCategoryList = async (name) => {
    let parentCategoryList = null;
    if (name) {
      parentCategoryList = await ParentCategory.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
    } else {
      parentCategoryList = await ParentCategory.findAll();
    }

    if (parentCategoryList) {
      return parentCategoryList;
    } else {
      return false;
    }
  };

  getParentCategoryById = async (id) => {
    const parentCategory = await ParentCategory.findOne({
      where: {
        id,
      },
    });

    if (parentCategory) {
      return parentCategory;
    } else {
      return false;
    }
  };

  storeNewParentCategory = async (parentCategory) => {
    let { name, icon_image } = parentCategory;

    const slug = stringToSlug(name);

    const newParentCategory = await ParentCategory.create({
      name,
      icon_image,
      slug
    });

    return newParentCategory;
  };

  updateParentCategoryById = async (id, newParentCategory) => {
    const oldParentCategory = await this.getParentCategoryById(id);

    if (oldParentCategory) {
      let { name, icon_image } = newParentCategory;

      const slug = stringToSlug(name);

      oldParentCategory.name = name;
      oldParentCategory.icon_image = icon_image;
      oldParentCategory.slug = slug;
      oldParentCategory.updatedAt = Date.now();

      const updatedParentCategory = await oldParentCategory.save();

      return updatedParentCategory;
    } else {
      return false;
    }
  };

  deleteParentCategoryById = async (id) => {
    const oldParentCategory = await this.getParentCategoryById(id);

    if (oldParentCategory) {
      const deletedParentCategory = await ParentCategory.destroy({
        where: {
          id,
        },
      });

      return deletedParentCategory;
    } else {
      return false;
    }
  };
}

module.exports = new ParentCategoryService();
