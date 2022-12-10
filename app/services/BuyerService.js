const { Buyer, SuccessBid, Product } = require("../../models");
const bcrypt = require("bcryptjs");

class BuyerService {
  getBuyerByEmail = async (email) => {
    const buyer = await Buyer.findOne({
      where: {
        email,
      },
    });

    if (buyer) {
      return buyer;
    } else {
      return false;
    }
  };

  createNewBuyer = async (requestedBuyer) => {
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
      } = requestedBuyer;

      const buyer = await this.getBuyerByEmail(email);

      if (buyer) {
        return false;
      }

      // Tạo ra một chuỗi ngẫu nhiên
      const salt = bcrypt.genSaltSync(10);
      // Mã hóa salt + password
      const hashPassword = bcrypt.hashSync(password, salt);

      const newBuyer = await Buyer.create({
        fullname,
        username,
        email,
        password: hashPassword,
        mobile,
        housenumber_street,
        zip_code,
        ward_id: ward,
        is_active: 1,
      });

      if (!newBuyer) {
        return false;
      }

      return newBuyer;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  getBuyerById = async (id) => {
    const buyer = await Buyer.findOne({
      where: {
        id,
      },
    });

    if (buyer) {
      return buyer;
    } else {
      return false;
    }
  };

  updateBuyerById = async (requestedBuyer, user) => {
    try {
    const { email, username, user_type } = user;

    let oldBuyer = await this.getBuyerByEmail(email);
    
    if (oldBuyer) {
      const {
        fullname,
        username,
        email,
        password,
        mobile,
        housenumber_street,
        zip_code,
        ward,
      } = requestedBuyer;

      // Tạo ra một chuỗi ngẫu nhiên
      const salt = bcrypt.genSaltSync(10);
      // Mã hóa salt + password
      const hashPassword = bcrypt.hashSync(password, salt);

      const isSame = bcrypt.compareSync(password, oldBuyer.password);

      if (!isSame) {
        oldBuyer.password = hashPassword;
      }

      oldBuyer.fullname = fullname;
      oldBuyer.email = email;
      oldBuyer.username = username;
      oldBuyer.mobile = mobile;
      oldBuyer.housenumber_street = housenumber_street;
      oldBuyer.zip_code = zip_code;
      oldBuyer.ward_id = ward;
      oldBuyer.updatedAt = Date.now();

      const updatedBuyer = await oldBuyer.save();

      return updatedBuyer;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

getSuccessBidsBySellerId = async (user) => {
    try {
      const { email, username, user_type } = user;

      const oldBuyer = await this.getBuyerByEmail(email);

      if (oldBuyer) {
        const successBids = await SuccessBid.findAll({
          where: {
            buyer_id: oldBuyer.id,
          },
          include: [
          {
            model: Product,
            as: "product",
          },
          ],
        })

        if(!successBids) {
          return false
        }

        return successBids
      } else {
      return false
      }
    } catch (error) {
      return false;
    }
  }
}

module.exports = new BuyerService();
