const {
  FirstSubCategory,
  SecondSubCategory,
  Product,
} = require("../../models");
const {stringToSlug} = require("../../utils/strHanlder");

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

  getFirstSubCategoryList = async (name) => {
    let firstSubCategoryList = null;
    if (name) {
      firstSubCategoryList = await FirstSubCategory.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
    } else {
      firstSubCategoryList = await FirstSubCategory.findAll();
    }

    if (firstSubCategoryList) {
      return firstSubCategoryList;
    } else {
      return false;
    }
  };

  getFirstSubCategoryById = async (id) => {
    const firstSubCategory = await FirstSubCategory.findOne({
      where: {
        id,
      },
    });

    if (firstSubCategory) {
      return firstSubCategory;
    } else {
      return false;
    }
  };

  storeNewFirstSubCategory = async (firstSubCategory) => {
    try {
      let { name, parent_category } = firstSubCategory;

      const slug = stringToSlug(name);

    const newFirstSubCategory = await FirstSubCategory.create({
      name,
      parent_category_id: parent_category,
      slug
    });

    if(!newFirstSubCategory) {
      return false;
    }

    return newFirstSubCategory;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  updateFirstSubCategoryById = async (id, newFirstSubCategory) => {
    const oldFirstSubCategory = await this.getFirstSubCategoryById(id);

    if (oldFirstSubCategory) {
      let { name, parent_category } = newFirstSubCategory;

      const slug = stringToSlug(name);

      oldFirstSubCategory.name = name;
      oldFirstSubCategory.parent_category_id = parent_category;
      oldFirstSubCategory.slug = slug;
      oldFirstSubCategory.updatedAt = Date.now();

      const updatedFirstSubCategory = await oldFirstSubCategory.save();

      return updatedFirstSubCategory;
    } else {
      return false;
    }
  };

  deleteFirstSubCategoryById = async (id) => {
    const oldFirstSubCategory = await this.getFirstSubCategoryById(id);

    if (oldFirstSubCategory) {
      const deletedFirstSubCategory = await FirstSubCategory.destroy({
        where: {
          id,
        },
      });

      return deletedFirstSubCategory;
    } else {
      return false;
    }
  };
}

module.exports = new FirstSubCategoryService();
