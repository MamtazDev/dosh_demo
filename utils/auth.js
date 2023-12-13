require("dotenv").config();

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const genearteToken = async (user) => {
  return jwt.sign(
    {
      name: user.name,
      email: user.email,
    },
    process.env.ACCESSS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

const sendEmail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: req.body.email,
    subject: "Dosh Capital",
    html: `<div style="padding: 25px">
    <h2>Your 1 year subscription to Microsoft 365 Family has been renewed</h2>

    <p>Your subscription was successfully renewed on Monday, May 22, 2023. On your next renewal date. Wednesday, May 22, 2024, AUD 139.00 including taxes will be charged.</p>

    <p>Sign into your Microsoft account to manage your subscriptions, including changing your payment method or cancelling a subscription to prevent future charges.</p>

    <p>You will receive a refund of your most recent recuring biling charge if you cancel your subscription and request a refund within 30 days after being charged. This refund right is limited to one time, per Microsoft Account per subscription product.</p>

    <div style="padding:5px, background-color:blue, color:white" >Manage your subscription</div>

    <h4>Subscription Information</h4>

    <p><span style="font-weight: bold">Subscription:</span> <span>Microsoft 365 Family</span></p>
    <p><span style="font-weight: bold">Order Number:</span> <span>50a9d26e-fb19-4326-b0fe-9049fc47ed37</span></p>
    <p><span style="font-weight: bold">Plan Price:</span> <span>AUD 139.00 including taxes/1 year</span></p>
    <p><span style="font-weight: bold">Renewal Date:</span> <span>22 May 2024</span></p>
    
    ${req.body.name}, here is your email.</div>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (!req.body.email) {
      return res.status(500).send({
        message: "Please put a valid email",
      });
    }
    if (error) {
      console.log(error);
    } else {
      return res.status(200).send({
        message: "Email sent successfully!",
        status: 200,
      });
    }
  });
};

module.exports = {
  genearteToken,
  sendEmail,
};
