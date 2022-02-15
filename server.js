// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool, Query } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const confirmationRoutes = require("./routes/confirmation");
const widgetsRoutes = require("./routes/widgets");
const menuRoutes = require("./routes/menu");
const cartRoutes = require("./routes/cart");


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own

app.use("/api/widgets", widgetsRoutes(db));


app.use("/menu", menuRoutes(db));
app.use("/cart", cartRoutes(db));
app.use("/confirmation", confirmationRoutes(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// GET Home
app.get("/", (req, res) => {
  res.render("01_index");
});
//GET Menu
app.get("/menu", (req, res) => {
  res.render("02_menu");
});
// GET Shopping Cart
// app.get("/cart", (req, res) => {
//   res.render("03_cart");
// });
// GET Pay
app.get("/pay", (req, res) => {
  res.render("04_pay");
});
// GET Order Confirmation
// app.get("/confirmation", (req, res) => {
//   res.render("05_confirmation");
// });
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
