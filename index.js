//packages
const express = require("express");
const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    // console.log("Let's fork another worker!");
    // cluster.fork();
  });
} else {
  //packages
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
  app.use(bodyParser.urlencoded({ extended: false }));

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
}
