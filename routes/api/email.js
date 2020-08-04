const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const validateEmail = require("../../validation/email");

router.get("/", (req, res) => {
  res.send("test");
});

router.post("/", (req, response, next) => {
  const { errors, isValid } = validateEmail(req.body);
  if (!isValid) {
    return response.status(400).json(errors);
  }
  const { name, email, html, message } = req.body;

  let subject = `Order From - ${name}`;
  const data = {
    to: "benaimjacob@gmail.com",
    from: email,
    subject,
    message,
    html,
  };
  sgMail
    .send(data)
    .then((res) => {
      console.log("Success");
      sendConfirmationToClient(email, html);
      return response.send({ name, email, html });
    })
    .catch((err) => {
      console.log(err);
      return response.status(400).send(err);
    });
});

const sendConfirmationToClient = (email, html) => {
  const confirmationData = {
    to: email,
    from: "benaimjacob@gmail.com",
    subject: "Order Confirmation - Dolce Nada",
    message: "Order Confirmed",
    html,
  };

  sgMail
    .send(confirmationData)
    .then((res) => {
      console.log("Confirmation sent to client");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = router;
