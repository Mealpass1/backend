const express = require("express");

const {
  dinerSubscribe,
  restaurantSubscribe,
  dinerNotifications,
  restaurantNotifications,
  dinerSee,
  restaurantSee,
} = require("../controllers/notification.controllers");

const restaurantAuth = require("../middlewares/restaurant.auth");
const dinerAuth = require("../middlewares/diner.auth");

const router = express.Router();

router.get("/diner", dinerAuth, dinerNotifications);
router.get("/restaurant", restaurantAuth, restaurantNotifications);
router.post("/diner/subscribe", dinerAuth, dinerSubscribe);
router.post("/restaurant/subscribe", restaurantAuth, restaurantSubscribe);
router.post("/diner/seen", dinerAuth, dinerSee);
router.post("/restaurant/seen", restaurantAuth, restaurantSee);

module.exports = router;
