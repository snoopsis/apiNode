const express = require("express");
const router = express.Router();
const nodeMailer = require("nodemailer");
const mysql = require("mysql");
const moment = require("moment");
require("dotenv").config();

const hoje = moment().format("DD/MM/YYYY");

// Create connection
const dbPortfolio = mysql.createConnection({
  host: "localhost",
  user: "buzios",
  password: "swing102030",
  database: "portfolio"
});

// Connect
dbPortfolio.connect(err => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected to Portfolio DB");
});

// Enviar mensagem do meu portfolio
router.post("/sendMessage", function(req, res) {
  const nome = req.body.nome;
  const email = req.body.email;
  const mensagem = req.body.mensagem;
  const data = hoje;

  // Inserir mensagem no banco de dados Mysql
  let sql = `INSERT INTO contato (nome, email, mensagem, data) VALUES ('${nome}', '${email}', '${mensagem}', '${data}')`;
  dbPortfolio.query(sql, (err, res) => {
    if (err) throw err;
  });

  let transporter = nodeMailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true,
    auth: {
      // should be replaced with real sender's account
      user: process.env.sendGridPortfolioUser,
      pass: process.env.sendGridPortfolioPass
    }
  });
  let mailOptions = {
    // should be replaced with real recipient's account
    from: "contato@migueldias.net",
    to: "migueledias@gmail.com",
    // bcc: "radiooper@buzios.dof.no",
    subject: `Nova mensagem de ${nome} enviada do formulario de Portfolio`,
    html: `<p>${mensagem}</p><br />
      <strong>Email: </strong>${email} <br />`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
  });
});

module.exports = router;
