const {
  SecondSubCategory,
} = require("../../models");
const {stringToSlug} = require("../../utils/strHanlder");

class SecondSubCategoryService {
    getSecondSubCategoryList = async (name) => {
    let secondSubCategoryList = null;
    if (name) {
      secondSubCategoryList = await SecondSubCategory.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
    } else {
      secondSubCategoryList = await SecondSubCategory.findAll();
    }

    if (secondSubCategoryList) {
      return secondSubCategoryList;
    } else {
      return false;
    }
  };

  getSecondSubCategoryById = async (id) => {
    const secondSubCategory = await SecondSubCategory.findOne({
      where: {
        id,
      },
    });

    if (secondSubCategory) {
      return secondSubCategory;
    } else {
      return false;
    }
  };

  storeNewSecondSubCategory = async (secondSubCategory) => {
    let { name, first_sub_category } = secondSubCategory;

    const slug = stringToSlug(name);

    const newSecondSubCategory = await SecondSubCategory.create({
      name,
      first_sub_category_id: first_sub_category,
      slug
    });

    return newSecondSubCategory;
  };

  updateSecondSubCategoryById = async (id, newSecondSubCategory) => {
    const oldSecondSubCategory = await this.getSecondSubCategoryById(id);

    if (oldSecondSubCategory) {
      let { name, first_sub_category } = newSecondSubCategory;

      const slug = stringToSlug(name);

      oldSecondSubCategory.name = name;
      oldSecondSubCategory.first_sub_category_id = first_sub_category;
      oldSecondSubCategory.slug = slug;
      oldSecondSubCategory.updatedAt = Date.now();

      const updatedSecondSubCategory = await oldSecondSubCategory.save();

      return updatedSecondSubCategory;
    } else {
      return false;
    }
  };

  deleteSecondSubCategoryById = async (id) => {
    const oldSecondSubCategory = await this.getSecondSubCategoryById(id);

    if (oldSecondSubCategory) {
      const deletedSecondSubCategory = await SecondSubCategory.destroy({
        where: {
          id,
        },
      });

      return deletedSecondSubCategory;
    } else {
      return false;
    }
  };
}

module.exports = new SecondSubCategoryService();