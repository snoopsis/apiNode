const express = require("express");
const router = express.Router();
const nodeMailer = require("nodemailer");
require("dotenv").config();

// Enviar mensagem do meu portfolio
router.post("/sendMessage", function(req, res) {
  const nome = req.body.nome;
  const email = req.body.email;
  const mensagem = req.body.mensagem;
  const telefone = req.body.telefone;

  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // should be replaced with real sender's account
      user: process.env.gmailLavandariaUser,
      pass: process.env.gmailLavandariaPass
    }
  });
  let mailOptions = {
    // should be replaced with real recipient's account
    from: "boipebacameras@gmail.com",
    to: "migueledias@gmail.com",
    // bcc: "radiooper@buzios.dof.no",
    subject: `Nova mensagem de ${nome} enviada do site da Lavandaria Ronfasec`,
    html: `<p>${mensagem}</p><br />
      <strong>Email: </strong>${email} <br />
      <strong>Telefone: </strong>${telefone} <br />`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
  });
});

module.exports = router;
