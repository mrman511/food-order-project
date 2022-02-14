const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM food;`)

      .then((data) => {
        const menu = data.rows;
        const drinks = [];
        const mains = [];
        const appetizers = [];

        for (let item in menu) {
          if (menu[item].category === "drinks") {
            drinks.push(menu[item]);
          } else if (menu[item].category === "appetizers") {
            appetizers.push(menu[item]);
          } else {
            mains.push(menu[item]);
          }
        }
        // db.query(`INSERT INTO order (user_id) VALUES (1)`);
        res.render("02_menu", { drinks, appetizers, mains });
      })
      .then(() => {
        db.query(`INSERT INTO orders (user_id) VALUES (1) RETURNING id`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/add/:id", (req, res) => {
    console.log("INSIDE THE ADD ROUTE BITCHES");
    const queryString = `INSERT INTO food_orders (order_id, food_id) 
                        VALUES (1, $1)`;

    const values = [req.params.id];
    db.query(queryString, values).then((response) => {
      console.log("Item added to order successfully");
    });
  });

  router.delete("/minus/:id", (req, res) => {
    console.log("req:", req.params.id);
    const queryString = `DELETE FROM food_orders 
                        WHERE order_id = 1 
                        AND food_id = $1`;
    const values = [req.params.id];
    db.query(queryString, values)
      .then((data) => {
        console.log(`Item removed from cart`);
      })
      .catch((err) => {
        console.log("ERROR: ", err);
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
