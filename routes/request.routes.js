const express = require("express");

const { create, allRequests } = require("../controllers/request.controllers");

const dinerAuth = require("../middlewares/diner.auth");
const restaurantAuth = require("../middlewares/restaurant.auth");

const router = express.Router();

router.get("/", restaurantAuth, allRequests);
router.post("/add", dinerAuth, create);

module.exports = router;
