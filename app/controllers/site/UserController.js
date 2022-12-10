const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const buyerService = require("../../services/BuyerService");
const sellerService = require("../../services/SellerService");

class UserController {
  // [POST] /user/register
  register = async (req, res) => {
    const { type } = req.body;

    if (type === "customer") {
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
        } = req.body;

        const requestedCustomer = {
          fullname,
          username,
          email,
          password,
          mobile,
          housenumber_street,
          zip_code,
          ward,
        };

        const newBuyer = await buyerService.createNewBuyer(requestedCustomer);

        if (newBuyer) {
          const access_token = jwt.sign(
            {
              email: newBuyer.email,
              username: newBuyer.username,
              user_type: "customer",
            },
            "esmartauctionsecretkey",
            { expiresIn: 60 * 60 * 24 }
          );

          res.status(200).send({
            message: "Đăng nhập thành công !",
            access_token,
            name: newBuyer.fullname,
          });
        } else {
          res.status(404).send({ message: "Không tìm thấy email phù hợp !!!" });
          return;
        }

        res.status(200).send(newBuyer);
      } catch (error) {
        res.status(500).send(error);
      }
    }

    if (type === "vendor") {
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
        } = req.body;

        const requestedSeller = {
          fullname,
          username,
          email,
          password,
          mobile,
          housenumber_street,
          zip_code,
          ward,
          company_name,
        };

        const newSeller = await sellerService.createNewSeller(requestedSeller);

        if (newSeller) {
          const access_token = jwt.sign(
            {
              email: newSeller.email,
              username: newSeller.username,
              user_type: "vendor",
            },
            "esmartauctionsecretkey",
            { expiresIn: 60 * 60 * 24 }
          );

          res.status(200).send({
            message: "Đăng nhập thành công !",
            access_token,
            name: newSeller.fullname,
          });
        } else {
          res.status(404).send({ message: "Không tìm thấy email phù hợp !!!" });
          return;
        }

        res.status(200).send(newSeller);
      } catch (error) {
        res.status(500).send(error);
      }
    }
  };

  // [POST] /user/login
  login = async (req, res) => {
    const { type } = req.body;

    if (type === "customer") {
      try {
        const { email, password } = req.body;
        const buyer = await buyerService.getBuyerByEmail(email);

        if (buyer) {
          // b2: Kiểm tra mật khẩu có đúng hay không ?
          const isAuth = bcrypt.compareSync(password, buyer.password);

          if (isAuth) {
            const access_token = jwt.sign(
              {
                email: buyer.email,
                username: buyer.username,
                user_type: "customer",
              },
              "esmartauctionsecretkey",
              { expiresIn: 60 * 60 * 24 }
            );

            res.status(200).send({
              message: "Đăng nhập thành công !",
              access_token,
              name: buyer.name,
              id: buyer.id,
            });
          } else {
            res
              .status(500)
              .send({ message: "Tài khoản hoặc mật khẩu không đúng !!!" });
          }
        } else {
          res.status(404).send({ message: "Không tìm thấy email phù hợp !!!" });
          return;
        }
      } catch (error) {
        res.status(500).send(error);
      }
    }

    if (type === "vendor") {
      try {
        const { email, password } = req.body;
        const seller = await sellerService.getSellerByEmail(email);

        if (seller) {
          // b2: Kiểm tra mật khẩu có đúng hay không ?
          const isAuth = bcrypt.compareSync(password, seller.password);

          if (isAuth) {
            const access_token = jwt.sign(
              {
                email: seller.email,
                username: seller.username,
                user_type: "vendor",
              },
              "esmartauctionsecretkey",
              { expiresIn: 60 * 60 * 24 }
            );

            res.status(200).send({
              message: "Đăng nhập thành công !",
              access_token,
              name: seller.name,
              id: seller.id,
            });
          } else {
            res
              .status(500)
              .send({ message: "Tài khoản hoặc mật khẩu không đúng !!!" });
          }
        } else {
          res.status(404).send({ message: "Không tìm thấy email phù hợp !!!" });
          return;
        }
      } catch (error) {
        res.status(500).send(error);
      }
    }
  };
}

module.exports = new UserController();
