const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const nodeMailer = require("nodemailer");
require("dotenv").config();

// Create connection
const dbBuzios = mysql.createConnection({
  host: "localhost",
  user: "buzios",
  password: "swing102030",
  database: "buzios"
});

// Connect
dbBuzios.connect(err => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected to Buzios DB");
});

// Inserir Recem Chegado no Buzios
router.post("/novoMembro", function(req, res) {
  var nome = req.body.nome;
  var empresa = req.body.empresa;
  var posicao = req.body.funcao;
  var nacionalidade = req.body.nacionalidade;
  var cpf = req.body.cpf;
  var nascimento = req.body.nascimento;
  var email = req.body.email;
  var genero = req.body.genero;
  var celular = req.body.celular;
  var nok_nome = req.body.nok_nome;
  var nok_tel = req.body.nok_cel;
  var sql = `INSERT INTO chegada (nome, empresa, posicao, nacionalidade, cpf, nascimento, email, genero, celular, nok_nome, nok_tel) VALUES
    ("${nome}", "${empresa}", "${posicao}","${nacionalidade}","${cpf}","${nascimento}","${email}","${genero}","${celular}","${nok_nome}","${nok_tel}")`;
  dbBuzios.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post 1 added...");
  });

  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // should be replaced with real sender's account
      user: process.env.gmailUser,
      pass: process.env.gmailPass
    }
  });
  let mailOptions = {
    // should be replaced with real recipient's account
    from: "migueledias@gmail.com",
    to: "skb.radio@technipfmc.com",
    bcc: "radiooper@buzios.dof.no",
    subject: `Novo Cadastro de ${nome}`,
    html: `<p>Chegada de novo Colaborador, seguem informacoes: </p><br />
      <strong>Nome: </strong>${nome} <br />
      <strong>Empresa: </strong>${empresa} <br />
      <strong>Posicao: </strong>${posicao} <br />
      <strong>Nacionalidade: </strong>${nacionalidade} <br />
      <strong>Genero: </strong>${genero} <br />
      <strong>Cpf: </strong>${cpf} <br />
      <strong>Nascimento: </strong>${nascimento} <br />
      <strong>Celular: </strong>${celular} <br />
      <strong>Email: </strong>${email} <br />
      <br />
      <h6>Contato de Emergencia:</h6>
      <br />
      <strong>NOK Nome: </strong>${nok_nome} <br />
      <strong>NOK Telefone: </strong>${nok_tel} <br />
      `
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
  });
});

module.exports = router;
