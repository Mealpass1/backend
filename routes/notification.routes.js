const express = require("express");

const {
  dinerSubscribe,
  restaurantSubscribe,
  notifications,
  see,
} = require("../controllers/notification.controllers");

const restaurantAuth = require("../middlewares/restaurant.auth");
const dinerAuth = require("../middlewares/diner.auth");

const router = express.Router();

router.get("/", dinerAuth, notifications);
router.post("/diner/subscribe", dinerAuth, dinerSubscribe);
router.post("/restaurant/subscribe", restaurantAuth, restaurantSubscribe);
router.post("/seen", dinerAuth, see);

module.exports = router;
