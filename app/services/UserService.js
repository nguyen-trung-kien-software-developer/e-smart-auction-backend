const { User } = require("../../models");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

class UserService {
  storeUser = async (user) => {
    const { name, email, username, password, mobile, avatar } = user;
    // Tạo avatar mặc định
    const avatarUrl = gravatar.url(email);
    // Tạo ra một chuỗi ngẫu nhiên
    const salt = bcrypt.genSaltSync(10);
    // Mã hóa salt + password
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      mobile,
      username,
      avatar: !avatar ? avatarUrl : avatar,
    });

    return newUser;
  };

  getUserByEmail = async (email) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return user;
    } else {
      return false;
    }
  };

  getUserList = async (name) => {
    let userList = null;
    if (name) {
      userList = await User.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
    } else {
      userList = await User.findAll();
    }

    if (userList) {
      return userList;
    } else {
      return false;
    }
  };

  getUserById = async (id) => {
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (user) {
      return user;
    } else {
      return false;
    }
  };

  storeNewUser = async (user) => {
    let { name, email, username, password, mobile, avatar } = user;

    // Tạo avatar mặc định
    const avatarUrl = gravatar.url(email);
    // Tạo ra một chuỗi ngẫu nhiên
    const salt = bcrypt.genSaltSync(10);
    // Mã hóa salt + password
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      mobile,
      username,
      avatar: !avatar ? avatarUrl : avatar,
    });

    return newUser;
  };

  updateUserById = async (id, newUser) => {
    const oldUser = await this.getUserById(id);

    if (oldUser) {
      let { name, email, username, password, mobile, avatar } = newUser;

      // Tạo avatar mặc định
      const avatarUrl = gravatar.url(email);
      // Tạo ra một chuỗi ngẫu nhiên
      const salt = bcrypt.genSaltSync(10);
      // Mã hóa salt + password
      const hashPassword = bcrypt.hashSync(password, salt);

      const isSame = bcrypt.compareSync(password, oldUser.password);

      if (!isSame) {
        oldUser.password = hashPassword;
      }

      oldUser.name = name;
      oldUser.email = email;
      oldUser.username = username;
      oldUser.password = password;
      oldUser.mobile = mobile;
      oldUser.avatar = !avatar ? avatarUrl : avatar;
      oldUser.updatedAt = Date.now();

      const updatedUser = await oldUser.save();

      return updatedUser;
    } else {
      return false;
    }
  };

  deleteUserById = async (id) => {
    const oldUser = await this.getUserById(id);

    if (oldUser) {
      const deletedUser = await User.destroy({
        where: {
          id,
        },
      });

      return deletedUser;
    } else {
      return false;
    }
  };
}

module.exports = new UserService();
