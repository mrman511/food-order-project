/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM food;`)
      .then(data => {
        const food = data.rows;
        res.json({ food });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  // router.get("/", (req, res) => {
  //   const id = req.params.id;
  //   db.query(`SELECT * FROM food;`)
  //     .then((response) => {
  //       const templateVars = {
  //         name: response.rows.name,
  //         price: response.rows
  //       }
  //       res.render('03_cart.ejs', templateVars);
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });
  return router;
};

// -get menu
// -get food items from orders
// -get checkout

// -post food item to orders
// -post add increase counter

// -post delete food item from orders
// -post decrease counter
