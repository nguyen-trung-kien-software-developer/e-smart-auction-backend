var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

class ContactController {
  //   index = async (req, res) => {
  //     const hotel = await hotelRepository.getAllHotelInformation();
  //     const collaborators = await collaboratorRepository.getAllCollaborator();
  //     let session = req.session;

  //     const currentUrl = req.originalUrl;

  //     res.render("contact/index", {
  //       title: "Contact Us Page",
  //       hotel: convertToObject(hotel),
  //       collaborators: convertToObject(collaborators),
  //       session,
  //       currentUrl
  //     });
  //   };

  sendEmail = async (req, res) => {
    try {
      let { name, email, message } = req.body;

      var mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: process.env.MAIL_USERNAME,
        subject: `Liên hệ đến ${process.env.APP_NAME}`,
        html: `<h1>${name} liên hệ đến ${process.env.APP_NAME}</h1>
        <p><strong>Tên: </strong> ${name}</p>
        <p><strong>Email: </strong> ${email}</p>
        <p><strong>Nội dung: </strong> ${message}</p>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(500).send(error);
        } else {
          res.status(200).send("Email đã gửi: " + info.response);
        }
      });

      res.status(200).send("Gửi mail thành công!");
    } catch (error) {
      res.status(500).send("Gửi mail thất bại!!!");
    }
  };
}

module.exports = new ContactController();
