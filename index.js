//packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();

//files
const dinerRoutes = require("./routes/diner.routes");
const cartRoutes = require("./routes/cart.routes");
const restaurantRoutes = require("./routes/restaurant.routes");
const dishRoutes = require("./routes/dish.routes");
const orderRoutes = require("./routes/order.routes");
const menuRoutes = require("./routes/menu.routes");

//initialize app
const app = express();

//databse
require("./services/db.service");

//some configurations
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//base endpoints
app.use("/diner", dinerRoutes);
app.use("/cart", cartRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/dish", dishRoutes);
app.use("/order", orderRoutes);
app.use("/menu", menuRoutes);

//start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
