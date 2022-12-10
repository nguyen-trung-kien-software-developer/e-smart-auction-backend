const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const access_token = req.header("access_token");
  try {
    const decode = jwt.verify(access_token, "esmartauctionsecretkey");
    // console.log(decode);

    if (decode) {
      req.user = decode;
      //   console.log(req.user);
      return next();
    } else {
      res.status(401).send("Bạn chưa đăng nhập");
    }
  } catch (error) {
    res.status(401).send("Bạn chưa đăng nhập");
  }
};

module.exports = {
  authenticate,
};
