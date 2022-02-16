require("dotenv").config();
const express = require("express");
const router = express.Router();
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_TOLKEN
);
const { sendSMS } = require("../functions/sms");

module.exports = (db) => {
  router.get("/", (req, res) => {
        db.query(`INSERT INTO orders (order_time)
             VALUES ('2008-11-11') RETURNING *`)
      .then((data) => {
        sendSMS()
        res.render("05_confirmation");
      })

      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};


