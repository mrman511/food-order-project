CREATE TABLE food_orders (
  food_id INTEGER REFERENCES food(id) NOT NULL,
  order_id INTEGER REFERENCES orders(id) NOT NULL
)