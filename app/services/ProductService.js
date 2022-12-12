const { Op } = require("sequelize");
const {
  Product,
  FirstSubCategory,
  SecondSubCategory,
  Seller,
  Ward,
  District,
  Province,
  Size,
  Color,
  Bid,
  Buyer,
} = require("../../models");
const {stringToSlug} = require("../../utils/strHanlder");

class ProductService {
  async getLastestProductListOrderByAuctionStartDesc() {
    try {
      const products = await Product.findAll({
        where: {
          auction_start: {
            [Op.lte]: new Date(),
          },
        },
        orderBy: {
          auction_start: "desc",
        },
        limit: 4,
      });

      if (!products) {
        return false;
      }

      return products;
    } catch (error) {
      return false;
    }
  }

  async getProductListByFirstSubCategorySlug(
    firstSubCategorySlug,
    page,
    price_from,
    price_to,
    size_id,
    color_id,
    sort
  ) {
    try {
      const firstSubCategory = await FirstSubCategory.findOne({
        where: {
          slug: firstSubCategorySlug,
        },
        include: [
          {
            model: SecondSubCategory,
            as: "secondSubCategories",
          },
        ],
      });

      if (!firstSubCategory) {
        return false;
      }

      let secondSubCategoryIds = [];
      firstSubCategory.secondSubCategories.forEach((secondSubCategory) => {
        secondSubCategoryIds.push(secondSubCategory.id);
      });

      let sorts = {};
      if (sort != null) {
        const sortArr = sort.split("-");
        const type = sortArr[0];
        const con = sortArr[1];

        switch (type) {
          case "created":
            if (con == "asc") {
              sorts = { ...sorts, order: [["created_date", "ASC"]] };
            } else if (con == "desc") {
              sorts = { ...sorts, order: [["created_date", "DESC"]] };
            }
            break;
          case "alpha":
            if (con == "asc") {
              sorts = { ...sorts, order: [["name", "ASC"]] };
            } else if (con == "desc") {
              sorts = { ...sorts, order: [["name", "DESC"]] };
            }
            break;
          case "price":
            if (con == "asc") {
              sorts = { ...sorts, order: [["price", "ASC"]] };
            } else if (con == "desc") {
              sorts = { ...sorts, order: [["price", "DESC"]] };
            }
            break;
          case "current_bid":
            if (con == "asc") {
              sorts = { ...sorts, order: [["current_bid_amount", "ASC"]] };
            } else if (con == "desc") {
              sorts = { ...sorts, order: [["current_bid_amount", "DESC"]] };
            }
          default:
            break;
        }
      }

      let conditions = {};

      if (price_from != null && price_to != null) {
        conditions = {
          ...conditions,
          price: {
            [Op.gte]: price_from,
            [Op.lte]: price_to,
          },
        };
      } else if (size_id != null) {
        conditions = {
          ...conditions,
          size_id,
        };
      } else if (color_id != null) {
        conditions = {
          ...conditions,
          color_id,
        };
      }

      const products = await Product.findAll({
        where: {
          category_id: {
            [Op.in]: secondSubCategoryIds,
          },
          ...conditions,
        },
        ...sorts,
      });

      return products;
    } catch (error) {
      return false;
    }
  }

  async getProductListByFirstSubCategorySlugHavingLimit(
    firstSubCategorySlug,
    page,
    price_from,
    price_to,
    size_id,
    color_id,
    sort
  ) {
    try {
      const firstSubCategory = await FirstSubCategory.findOne({
        where: {
          slug: firstSubCategorySlug,
        },
        include: [
          {
            model: SecondSubCategory,
            as: "secondSubCategories",
          },
        ],
      });

      if (!firstSubCategory) {
        return false;
      }

      let secondSubCategoryIds = [];
      firstSubCategory.secondSubCategories.forEach((secondSubCategory) => {
        secondSubCategoryIds.push(secondSubCategory.id);
      });

      let sorts = {};
      if (sort != null) {
        const sortArr = sort.split("-");
        const type = sortArr[0];
        const con = sortArr[1];

        switch (type) {
          case "created":
            if (con == "asc") {
              sorts = { ...sorts, order: [["created_date", "ASC"]] };
            } else if (con == "desc") {
              sorts = { ...sorts, order: [["created_date", "DESC"]] };
            }
            break;
          case "alpha":
            if (con == "asc") {
              sorts = { ...sorts, order: [["name", "ASC"]] };
            } else if (con == "desc") {
              sorts = { ...sorts, order: [["name", "DESC"]] };
            }
            break;
          case "price":
            if (con == "asc") {
              sorts = { ...sorts, order: [["price", "ASC"]] };
            } else if (con == "desc") {
              sorts = { ...sorts, order: [["price", "DESC"]] };
            }
            break;
          case "current_bid":
            if (con == "asc") {
              sorts = { ...sorts, order: [["current_bid_amount", "ASC"]] };
            } else if (con == "desc") {
              sorts = { ...sorts, order: [["current_bid_amount", "DESC"]] };
            }
          default:
            break;
        }
      }

      let conditions = {};

      if (price_from != null && price_to != null) {
        conditions = {
          ...conditions,
          price: {
            [Op.gte]: price_from,
            [Op.lte]: price_to,
          },
        };
      } else if (size_id != null) {
        conditions = {
          ...conditions,
          size_id,
        };
      } else if (color_id != null) {
        conditions = {
          ...conditions,
          color_id,
        };
      }

      const products = await Product.findAll({
        where: {
          category_id: {
            [Op.in]: secondSubCategoryIds,
          },
          ...conditions,
        },
        ...sorts,
        offset: page * 9,
        limit: 9,
      });

      return products;
    } catch (error) {
      return false;
    }
  }

  async getProductListBySecondSubCategorySlug(
    secondSubCategorySlug,
    page,
    price_from,
    price_to,
    size_id,
    color_id,
    sort
  ) {
    try {
      const secondSubCategory = await SecondSubCategory.findOne({
        where: {
          slug: secondSubCategorySlug,
        },
      });

      if (!secondSubCategory) {
        return false;
      }

      let sorts = {};
      if (sort != null) {
        const sortArr = sort.split("-");
        const type = sortArr[0];
        const con = sortArr[1];

        switch (type) {
          case "created":
            if (con == "asc") {
              sorts = { ...sorts, order: [["created_date", "ASC"]] };
            } else if (con == "desc") {
              sorts = { ...sorts, order: [["created_date", "DESC"]] };
            }
            break;
          case "alpha":
            if (con == "asc") {
              sorts = { ...sorts, order: [["name", "ASC"]] };
            } else if (con == "desc") {
              sorts = { ...sorts, order: [["name", "DESC"]] };
            }
            break;
          case "price":
            if (con == "asc") {
              sorts = { ...sorts, order: [["price", "ASC"]] };
            } else if (con == "desc") {
              sorts = { ...sorts, order: [["price", "DESC"]] };
            }
            break;
          case "current_bid":
            if (con == "asc") {
              sorts = { ...sorts, order: [["current_bid_amount", "ASC"]] };
            } else if (con == "desc") {
              sorts = { ...sorts, order: [["current_bid_amount", "DESC"]] };
            }
          default:
            break;
        }
      }

      let conditions = {};

      if (price_from != null && price_to != null) {
        conditions = {
          ...conditions,
          price: {
            [Op.gte]: price_from,
            [Op.lte]: price_to,
          },
        };
      } else if (size_id != null) {
        conditions = {
          ...conditions,
          size_id,
        };
      } else if (color_id != null) {
        conditions = {
          ...conditions,
          color_id,
        };
      }

      const products = await Product.findAll({
        where: {
          category_id: secondSubCategory.id,
          ...conditions,
        },
        ...sorts,
      });

      return products;
    } catch (error) {
      return false;
    }
  }

  async getProductListBySecondSubCategorySlugHavingLimit(
    secondSubCategorySlug,
    page,
    price_from,
    price_to,
    size_id,
    color_id,
    sort
  ) {
    try {
      const secondSubCategory = await SecondSubCategory.findOne({
        where: {
          slug: secondSubCategorySlug,
        },
      });

      if (!secondSubCategory) {
        return false;
      }

      let sorts = {};
      if (sort != null) {
        const sortArr = sort.split("-");
        const type = sortArr[0];
        const con = sortArr[1];

        switch (type) {
          case "created":
            if (con == "asc") {
              sorts = { ...sorts, order: [["created_date", "ASC"]] };
            } else if (con == "desc") {
              sorts = { ...sorts, order: [["created_date", "DESC"]] };
            }
            break;
          case "alpha":
            if (con == "asc") {
              sorts = { ...sorts, order: [["name", "ASC"]] };
            } else if (con == "desc") {
              sorts = { ...sorts, order: [["name", "DESC"]] };
            }
            break;
          case "price":
            if (con == "asc") {
              sorts = { ...sorts, order: [["price", "ASC"]] };
            } else if (con == "desc") {
              sorts = { ...sorts, order: [["price", "DESC"]] };
            }
            break;
          case "current_bid":
            if (con == "asc") {
              sorts = { ...sorts, order: [["current_bid_amount", "ASC"]] };
            } else if (con == "desc") {
              sorts = { ...sorts, order: [["current_bid_amount", "DESC"]] };
            }
          default:
            break;
        }
      }

      let conditions = {};

      if (price_from != null && price_to != null) {
        conditions = {
          ...conditions,
          price: {
            [Op.gte]: price_from,
            [Op.lte]: price_to,
          },
        };
      } else if (size_id != null) {
        conditions = {
          ...conditions,
          size_id,
        };
      } else if (color_id != null) {
        conditions = {
          ...conditions,
          color_id,
        };
      }

      const products = await Product.findAll({
        where: {
          category_id: secondSubCategory.id,
          ...conditions,
        },
        ...sorts,
        offset: page * 9,
        limit: 9,
      });

      return products;
    } catch (error) {
      return false;
    }
  }

  async getProductById(id) {
    try {
      const product = await Product.findOne({
        where: {
          id,
        },
      });

      if (!product) {
        return false;
      }

      return product;
    } catch (error) {
      return false;
    }
  }

  async getProductBySlug(productSlug) {
    try {
      const product = await Product.findOne({
        where: {
          slug: productSlug,
        },
        include: [
          {
            model: Size,
            as: "size",
          },
          {
            model: Color,
            as: "color",
          },
          {
            model: Seller,
            as: "seller",
            include: [
              {
                model: Ward,
                as: "ward",
                include: [
                  {
                    model: District,
                    as: "district",
                    include: [
                      {
                        model: Province,
                        as: "province",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            model: SecondSubCategory,
            as: "secondSubCategory",
            include: [
              {
                model: FirstSubCategory,
                as: "firstSubCategory",
                include: [
                  {
                    model: Product,
                    as: "product",
                  },
                ],
              },
            ],
          },
          {
            model: Bid,
            as: "bids",
            include: [
              {
                model: Buyer,
                as: "buyer",
              },
              {
                model: Seller,
                as: "seller",
              },
            ],
          },
        ],
      });

      if (!product) {
        return false;
      }

      return product;
    } catch (error) {
      return false;
    }
  }

  async getRelatedProductsByProductSlug(productSlug) {
    try {
      const product = await Product.findOne({
        where: {
          slug: productSlug,
        },
      });

      if (!product) {
        return false;
      }

      const category_id = product.category_id;

      const products = await Product.findAll({
        where: {
          category_id,
        },
      });

      if (!products) {
        return false;
      }

      return products;
    } catch (error) {
      
      return false;
    }
  }

  getProductList = async (name) => {
    let productList = null;
    if (name) {
      productList = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
    } else {
      productList = await Product.findAll();
    }

    if (productList) {
      return productList;
    } else {
      return false;
    }
  };

  storeNewProduct = async (product) => {
    try {
      let { sku,
          name,
          hover_featured_image,
          featured_image,
          short_subscription,
          description_detail,
          additional_information,
          condition,
          price,
          start_bid_amount,
          current_bid_amount,
          step_bid_amount,
          auction_start,
          auction_end,
          category_id,
          size_id,
          seller,
          color_id } = product;

    const slug = stringToSlug(name);

    const newProduct = await Product.create({
        sku,
        name,
        hover_featured_image,
        featured_image,
        short_subscription,
        description_detail,
        additional_information,
        condition,
        price,
        start_bid_amount,
        current_bid_amount,
        step_bid_amount,
        auction_start,
        auction_end,
        category_id,
        seller_id: seller,
        size_id,
        color_id,
        slug,
        created_date: Date.now(),
    });

    if(!newProduct) {
      return false;
    }

    return newProduct;
    } catch (err) {
      console.log(err);
      return false
    }
  };

  updateProductById = async (id, newProduct) => {
    try {
      const oldProduct = await this.getProductById(id);

    if (oldProduct) {
      let { sku,
          name,
          hover_featured_image,
          featured_image,
          short_subscription,
          description_detail,
          additional_information,
          condition,
          price,
          start_bid_amount,
          current_bid_amount,
          step_bid_amount,
          auction_start,
          auction_end,
          category_id,
          size_id,
          color_id,
        seller } = newProduct;

      const slug = stringToSlug(name);

      oldProduct.sku = sku;
      oldProduct.name = name;
      oldProduct.hover_featured_image = hover_featured_image;
      oldProduct.featured_image = featured_image;
      oldProduct.short_subscription = short_subscription;
      oldProduct.description_detail = description_detail;
      oldProduct.additional_information = additional_information;
      oldProduct.condition = condition;
      oldProduct.price = price;
      oldProduct.start_bid_amount = start_bid_amount;
      oldProduct.current_bid_amount = current_bid_amount;
      oldProduct.step_bid_amount = step_bid_amount;
      oldProduct.current_bid_amount = current_bid_amount;
      oldProduct.auction_start = auction_start;
      oldProduct.auction_end = auction_end;
      oldProduct.category_id = category_id;
      oldProduct.size_id = size_id;
      oldProduct.color_id = color_id;
      oldProduct.seller_id = seller;
      oldProduct.slug = slug;
      oldProduct.updatedAt = Date.now();

      const updatedProduct = await oldProduct.save();

      if(!updatedProduct) {
        return false;
      }

      return updatedProduct;
    } else {
      return false;
    }
    } catch (error) {
      return false
    }
  };

  deleteProductById = async (id) => {
    const oldProduct = await this.getProductById(id);

    if (oldProduct) {
      const deletedProduct = await Product.destroy({
        where: {
          id,
        },
      });

      return deletedProduct;
    } else {
      return false;
    }
  };
}

module.exports = new ProductService();
