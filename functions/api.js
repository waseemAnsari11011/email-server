// server.js

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const serverless = require('serverless-http');

const app = express();
const router = express.Router();
// Use the cors middleware
app.use(cors());
app.use(express.json()); // For parsing JSON data
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data
const port = 5000;

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Set to false for STARTTLS
  auth: {
    user: "waseemahm05@gmail.com",
    pass: "chezjhpirdwrusvk",
  },
  // Specify the desired SSL/TLS version
  tls: {
    minVersion: "TLSv1.2",
  },
});
///
// Define the route to handle the form submission and send the email
router.post("/send-email", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Set up the email content
  const mailOptions = {
    from: "waseemahm05@gmail.com",
    to: "waseemahm11011@gmail.com", // Replace with the recipient email address
    subject: `New Message from ${name}: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Error sending email" });
    } else {
      console.log("Email sent:", info.response);
      res.json({ message: "Email sent successfully" });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);