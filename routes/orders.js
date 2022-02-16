const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    if (!req.cookies["order_id"]) {
      db.query(`INSERT INTO orders (user_id) VALUES (1) RETURNING id;`).then(
        (response) => {
          console.log("response.rows[0].id: ", response.rows[0].id);
          res.cookie("order_id", response.rows[0].id);
          res.json({ id: response.rows[0].id });
        }
      );
    } else {
      res.json({ id: req.cookies["user_id"], cookie: true });
    }
  });
  return router;
};
