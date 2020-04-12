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
  // for contact form
  // let defaultHtml = `<div>${message} <br /> from ${name} - ${email}</div>`;
  let subject = `Order From - ${name}`;
  const msg = {
    to: "dolcenadaa@gmail.com",
    from: email,
    subject,
    message,
    html,
  };
  sgMail
    .send(msg)
    .then((res) => {
      console.log("Success");
      return response.send({ name, email, html });
    })
    .catch((err) => {
      console.log(err);
      return response.status(400).send(err);
    });
});

module.exports = router;
