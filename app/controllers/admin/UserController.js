const userService = require("../../services/UserService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {
  // [POST] /admin/register
  register = async (req, res) => {
    const requestUser = req.body;

    try {
      const newUser = await userService.storeUser(requestUser);

      // Login after user register
      const user = await userService.getUserByEmail(newUser.email);

      if (user) {
        const access_token = jwt.sign(
          { email: user.email, username: user.username },
          "esmartauctionsecretkey",
          { expiresIn: 60 * 60 * 24 }
        );

        res.status(200).send({
          message: "Đăng nhập thành công !",
          access_token,
          name: user.name,
        });
      } else {
        res.status(404).send({ message: "Không tìm thấy email phù hợp !!!" });
        return;
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };

  // [POST] /admin/login
  login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email);

    if (user) {
      // b2: Kiểm tra mật khẩu có đúng hay không ?
      const isAuth = bcrypt.compareSync(password, user.password);

      if (isAuth) {
        const access_token = jwt.sign(
          { email: user.email, username: user.username },
          "esmartauctionsecretkey",
          { expiresIn: 60 * 60 * 24 }
        );

        res.status(200).send({
          message: "Đăng nhập thành công !",
          access_token,
          name: user.name,
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
  };

  index = async (req, res) => {
    const { name } = req.query;

    try {
      const userList = await userService.getUserList(name);

      if (!userList) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(userList);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  store = async (req, res) => {
    const user = req.body;

    try {
      const createdUser = await userService.storeNewUser(user);

      res.status(201).send(createdUser);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  edit = async (req, res) => {
    const { id } = req.params;

    try {
      const user = await userService.getUserById(id);

      if (!user) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const newUser = req.body;

    try {
      const updatedUser = await userService.updateUserById(id, newUser);

      if (!updatedUser) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send(updatedUser);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  destroy = async (req, res) => {
    const { id } = req.params;

    try {
      const deletedUser = await userService.deleteUserById(id);

      if (!deletedUser) {
        res.status(404).send("NOT FOUND !!!");
        return;
      }

      res.status(200).send("Deleted User Successfully !");
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

module.exports = new UserController();
