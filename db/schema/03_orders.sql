-- now()::date // Used to the current time. Must be used in conditional
-- statement when querying DB.
DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  time_ready DATE NULL,
  order_time DATE NULL,
  complete BOOLEAN DEFAULT FALSE
);