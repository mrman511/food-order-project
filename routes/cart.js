const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log(req.params.id);
    db.query(
      `SELECT food.image as image,
            food.title as title,
            food.price as price
    FROM orders
    JOIN food_orders
    ON orders.id = food_orders.order_id
    JOIN food 
    ON food.id = food_orders.order_id;`
    )
      .then((data) => {
        const food = data.rows;
        res.render("03_cart", { food });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/food-count", (req, res) => {
    const queryString = `
    SELECT COUNT(food_id),food_orders_id
    FROM food_orders
    JOIN orders
    ON order_id = orders.id
    WHERE orders.id = $1 
    ;`;
    const values = req.cookies["order_id"];

    db.query(queryString, values).then((response) => {
      res.send(response.rows);
    });
  });

  return router;
};

// -get menu
// -get food items from orders
// -get checkout

// -post food item to orders
// -post add increase counter

// -post delete food item from orders
// -post decrease counter
