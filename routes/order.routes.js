const express = require("express");

const { create, allOrders } = require("../controllers/order.controllers");

const dinerMiddleware = require("../middlewares/diner.auth");
const restaurantMiddleware = require("../middlewares/restaurant.auth");

const router = express.Router();

router.post("/add", dinerMiddleware, create);
router.get("/", restaurantMiddleware, allOrders);

module.exports = router;
