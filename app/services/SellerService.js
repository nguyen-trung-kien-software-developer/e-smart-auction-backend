const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { Seller, Ward, District, Province, Product, sequelize } = require("../../models");
const { QueryTypes } = require("sequelize");
const {stringToSlug} = require("../../utils/strHanlder");

class SellerService {
  getAllSellers = async (page, name) => {
    try {
      let condition = {};

      if (name != null) {
        condition = {
          ...condition,
          where: {
            fullname: {
              [Op.like]: `%${name}%`,
            },
          },
        };
      }
      const sellers = await Seller.findAll({
        ...condition,
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
          {
            model: Product,
            as: "products",
          },
        ],
        offset: page * 12,
        limit: 12,
      });

      if (!sellers) {
        return false;
      }

      return sellers;
    } catch (error) {
      return false;
    }
  };

  getSellerById = async (sellerId, sort, product_name) => {
    try {
      let condition = {};

      if (product_name != null) {
        condition = {
          ...condition,
          where: {
            name: {
              [Op.like]: `%${product_name}%`,
            },
          },
        };
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

      const seller = await Seller.findOne({
        where: {
          id: sellerId,
        },
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
          {
            model: Product,
            as: "products",
            ...condition,
            ...sorts,
          },
        ],
      });

      if (!seller) {
        return false;
      }

      return seller;
    } catch (err) {
      return false;
    }
  };

  getSellerByEmail = async (email) => {
    const seller = await Seller.findOne({
      where: {
        email,
      },
    });

    if (seller) {
      return seller;
    } else {
      return false;
    }
  };

  createNewSeller = async (requestedSeller) => {
    try {
      const {
        fullname,
        username,
        email,
        password,
        mobile,
        housenumber_street,
        zip_code,
        ward,
        company_name,
      } = requestedSeller;

      const seller = await this.getSellerByEmail(email);

      if (seller) {
        return false;
      }

      // Tạo ra một chuỗi ngẫu nhiên
      const salt = bcrypt.genSaltSync(10);
      // Mã hóa salt + password
      const hashPassword = bcrypt.hashSync(password, salt);

      const newSeller = await Seller.create({
        fullname,
        username,
        email,
        password: hashPassword,
        mobile,
        housenumber_street,
        zip_code,
        ward_id: ward,
        company_name,
        is_active: 1,
      });

      if (!newSeller) {
        return false;
      }

      return newSeller;
    } catch (error) {
      return false;
    }
  };

  updateSellerById = async (requestedSeller, user) => {
    try {
      const { email, username, user_type } = user;

      let oldSeller = await this.getSellerByEmail(email);
    
    if (oldSeller) {
      const {
        fullname,
        username,
        email,
        password,
        mobile,
        housenumber_street,
        zip_code,
        ward,
      } = requestedSeller;

      // Tạo ra một chuỗi ngẫu nhiên
      const salt = bcrypt.genSaltSync(10);
      // Mã hóa salt + password
      const hashPassword = bcrypt.hashSync(password, salt);

      const isSame = bcrypt.compareSync(password, oldSeller.password);

      if (!isSame) {
        oldSeller.password = hashPassword;
      }

      oldSeller.fullname = fullname;
      oldSeller.email = email;
      oldSeller.username = username;
      oldSeller.mobile = mobile;
      oldSeller.housenumber_street = housenumber_street;
      oldSeller.zip_code = zip_code;
      oldSeller.ward_id = ward;
      oldSeller.updatedAt = Date.now();

      const updatedSeller = await oldSeller.save();

      return updatedSeller;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

  getOrderListBySellerIdOrderByCreatedDateDesc = async (user) => {
    try {
      const { email, username, user_type } = user;

      const oldSeller = await this.getSellerByEmail(email);

      if (oldSeller) {
        const orders = await sequelize.query(
          `SELECT orders.* FROM orders INNER JOIN orderitems ON orderitems.order_id = orders.id INNER JOIN successbids ON orderitems.success_bid_id = successbids.id INNER JOIN products ON successbids.product_id = products.id INNER JOIN sellers ON products.seller_id = sellers.id WHERE successbids.paid = 1 OR sellers.id = ${oldSeller.id}`,
          { 
            type: QueryTypes.SELECT,
          }
        )

        if(!orders) {
          return false
        }

        return orders
      } else {
      return false
    }
    } catch (error) {
      return false;
    }
  }

  getProductListBySellerIdOrderByCreatedDateDesc = async (user) => {
    try {
      const { email, username, user_type } = user;

      const oldSeller = await this.getSellerByEmail(email);

      if (oldSeller) {
        const products = await Product.findAll({
          where: {
            seller_id: oldSeller.id,
          },
          order: [["created_date", "DESC"]]
        })

        if(!products) {
          return false
        }

        return products
      } else {
      return false
      }
    } catch (error) {
      return false;
    }
  }
  
  getProductInStoreHavingLimit = async (user, page, sort) => {
    try {
      const { email, username, user_type } = user;

      const oldSeller = await this.getSellerByEmail(email);

      if (oldSeller) {
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

        const products = await Product.findAll({
          where: {
            seller_id: oldSeller.id,
          },
          ...sorts,
          offset: page * 9,
          limit: 9,
        })

        if(!products) {
          return false
        }

        return products
      } else {
      return false
      }
    } catch (error) {
      console.log(error)
      return false;
    }
  }

  getProductDetailByProductId = async (productId, user) => {
    try {
      const { email, username, user_type } = user;

      const oldSeller = await this.getSellerByEmail(email);

      if (oldSeller) {
        const product = await Product.findOne({
          where: {  
            id: productId,
            seller_id: oldSeller.id,
          }
        });
        
        if(!product) {
          return false
        }

        return product
      } else {
      return false
      }
  } catch (err) {
    return false;
  }
  }

  updateStoreInformationBySellerLogon = async (requestedSeller, user) => {
    try {
      const { email, username, user_type } = user;

      let oldSeller = await this.getSellerByEmail(email);

      if (oldSeller) {
        const {
        company_name,
        housenumber_street,
        ward,
        mobile,
        zip_code,
        account_no,
        account_type,
      } = requestedSeller;

      oldSeller.company_name = company_name;
      oldSeller.housenumber_street = housenumber_street;
      oldSeller.ward_id = ward;
      oldSeller.mobile = mobile;
      oldSeller.zip_code = zip_code;
      oldSeller.account_no = account_no;
      oldSeller.account_type = account_type;
      oldSeller.updatedAt = Date.now();

      const updatedSeller = await oldSeller.save();

      return updatedSeller;
      } else {
      return false
      }
  } catch (err) {
    console.log(err);
    return false;
  }
  }

  createNewProductBySeller = async (requestedProduct, user) => {
    try {
      const { email, username, user_type } = user;

      let oldSeller = await this.getSellerByEmail(email);

      if (oldSeller) {
        let {
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
          size_id,
          color_id,
      } = requestedProduct;

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
        seller_id: oldSeller.id,
        size_id,
        color_id,
        slug,
        created_date: Date.now(),
      });

      if (!newProduct) {
        return false;
      }

      return newProduct;
      } else {
      return false
      }
  } catch (err) {
    return false;
  }
  }

  updateProductByProductId = async (requestedProduct, user, productId) => {
    try {
      const { email, username, user_type } = user;

      let oldSeller = await this.getSellerByEmail(email);

      if (oldSeller) {
        let {
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
          size_id,
          color_id,
      } = requestedProduct;

      const slug = stringToSlug(name);

      let oldProduct = await this.getProductDetailByProductId(productId, user) 

      if(!oldProduct) {
        return false;
      }

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
      oldProduct.slug = slug;
      oldProduct.updatedAt = Date.now();

      const updatedProduct = await oldProduct.save();

      return updatedProduct;
      } else {
      return false
      }
  } catch (err) {
    return false;
  }
  }

  deleteProductByProductId = async (user, productId) => {
    try {
      const { email, username, user_type } = user;

      let oldSeller = await this.getSellerByEmail(email);
      
      if (oldSeller) {
        let oldProduct = await this.getProductDetailByProductId(productId, user) 

        if(!oldProduct) {
          return false;
        }

        const deletedRoom = await Product.destroy({
        where: {
          id: oldProduct.id,
        },
      });

        return deletedRoom;
      } else {
      return false
      }
  } catch (err) {
    console.log(err)
    return false;
  }
  }

  getWallet = async (user) => {
    try {
      const { email, username, user_type } = user;

      let oldSeller = await this.getSellerByEmail(email);

      if (oldSeller) {
        const wallet = {
          current_amount: oldSeller.wallet,
          minimum_withdraw: oldSeller.minimum_withdraw
        };

        if(!wallet) {
          return false;
        }

        return wallet;
      } else {
        return false;
      }
      
    } catch (error) {
      return false
    }
  }

  getSellerDashboard = async (user) => {
    try {
      const { email, username, user_type } = user;

      let oldSeller = await this.getSellerByEmail(email);

      if (oldSeller) {
        const revenue = await sequelize.query(
          `SELECT sum(successbids.win_bid_amount) AS revenue FROM successbids 
            INNER JOIN products ON successbids.product_id = products.id
            INNER JOIN sellers ON products.seller_id = sellers.id
            WHERE sellers.id = ${oldSeller.id}`,
          { 
            type: QueryTypes.SELECT,
          }
        );

        const successBidAmount = await sequelize.query(
          `SELECT count(*) AS success_bid_amount FROM successbids 
            INNER JOIN products ON successbids.product_id = products.id
            INNER JOIN sellers ON products.seller_id = sellers.id
            WHERE successbids.paid = 1 && sellers.id = ${oldSeller.id}`,
          { 
            type: QueryTypes.SELECT,
          }
        )

        const participantBidAmount = await sequelize.query(
          `SELECT count(*) AS participant_bid_amount FROM bids 
            INNER JOIN products ON bids.product_id = products.id
            INNER JOIN sellers ON products.seller_id = sellers.id
            WHERE sellers.id = ${oldSeller.id}`,
          {
            type: QueryTypes.SELECT,
          }
        )

        const successOrderAmount = await sequelize.query(
          `SELECT count(*) AS success_order_amount FROM orders 
            INNER JOIN orderitems ON orderitems.order_id = orders.id 
            INNER JOIN successbids ON orderitems.success_bid_id = successbids.id 
            INNER JOIN products ON successbids.product_id = products.id 
            INNER JOIN sellers ON products.seller_id = sellers.id 
            WHERE successbids.paid = 1 AND orders.order_status_id = 2 AND sellers.id = ${oldSeller.id}`,
          {
            type: QueryTypes.SELECT,
          }
        )

        const failOrderAmount = await sequelize.query(
          `SELECT count(*) AS fail_order_amount FROM orders 
            INNER JOIN orderitems ON orderitems.order_id = orders.id 
            INNER JOIN successbids ON orderitems.success_bid_id = successbids.id 
            INNER JOIN products ON successbids.product_id = products.id 
            INNER JOIN sellers ON products.seller_id = sellers.id 
            WHERE successbids.paid = 1 AND orders.order_status_id = 3 AND sellers.id = ${oldSeller.id}`,
          {
            type: QueryTypes.SELECT,
          }
        )

        const orderTotal = await sequelize.query(
          `SELECT count(*) AS order_total FROM orders 
            INNER JOIN orderitems ON orderitems.order_id = orders.id 
            INNER JOIN successbids ON orderitems.success_bid_id = successbids.id 
            INNER JOIN products ON successbids.product_id = products.id 
            INNER JOIN sellers ON products.seller_id = sellers.id 
            WHERE successbids.paid = 1 AND sellers.id = ${oldSeller.id}`,
          {
            type: QueryTypes.SELECT,
          }
        )

        const orderTotalInWaitingProcessStatus = await sequelize.query(
          `SELECT count(*) as order_total_in_waiting_process_status FROM orders 
            INNER JOIN orderitems ON orderitems.order_id = orders.id 
            INNER JOIN successbids ON orderitems.success_bid_id = successbids.id 
            INNER JOIN products ON successbids.product_id = products.id 
            INNER JOIN sellers ON products.seller_id = sellers.id 
            WHERE successbids.paid = 1 AND orders.order_status_id = 1 AND sellers.id = ${oldSeller.id}`,
          {
            type: QueryTypes.SELECT,
          }
        )

        const orderTotalInPaidStatus = await sequelize.query(
          `SELECT count(*) AS order_total_in_paid_status FROM orders 
            INNER JOIN orderitems ON orderitems.order_id = orders.id 
            INNER JOIN successbids ON orderitems.success_bid_id = successbids.id 
            INNER JOIN products ON successbids.product_id = products.id 
            INNER JOIN sellers ON products.seller_id = sellers.id 
            WHERE successbids.paid = 1 AND orders.order_status_id = 2 AND sellers.id = ${oldSeller.id}`,
          {
            type: QueryTypes.SELECT,
          }
        )

        const orderTotalInCancelStatus = await sequelize.query(
          `SELECT count(*) AS order_total_in_cancel_status FROM orders 
            INNER JOIN orderitems ON orderitems.order_id = orders.id 
            INNER JOIN successbids ON orderitems.success_bid_id = successbids.id 
            INNER JOIN products ON successbids.product_id = products.id 
            INNER JOIN sellers ON products.seller_id = sellers.id 
            WHERE successbids.paid = 1 AND orders.order_status_id = 3 AND sellers.id = ${oldSeller.id}`,
          {
            type: QueryTypes.SELECT,
          }
        )

        const dashboard = {
          successBidAmount,
          revenue,
          participantBidAmount,
          successOrderAmount,
          failOrderAmount,
          orderTotal,
          orderTotalInWaitingProcessStatus,
          orderTotalInPaidStatus,
          orderTotalInCancelStatus,
        };

        if(!dashboard) {
          return false;
        }

        return dashboard;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}

module.exports = new SellerService();
