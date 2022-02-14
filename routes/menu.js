const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM food;`)
      .then(data => {
        const menu = data.rows;
        const drinks = [];
        const mains = [];
        const appetizers = [];

        for (let item in menu) {
          if (menu[item].category === 'drinks'){
            drinks.push(menu[item])
          } else if (menu[item].category === 'appetizers'){
            appetizers.push(menu[item]);
          } else {
            mains.push(menu[item]);
          }
        }

        res.render('02_menu', { drinks, appetizers, mains });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

// <!-- menu -->

// -get food items by category for menu
// -get route for drinks
// -get route for appetizers
// -get route for main
// -get route to cart

// -post food item to orders
// -post add increase counter

// -post delete food item from orders
// -post decrease counter
