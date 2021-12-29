const express = require("express");

const {
  signup,
  login,
  logout,
  allRestaurants,
} = require("../controllers/restaurant.controllers");

const authMiddleware = require("../middlewares/restaurant.auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/logout/:id", authMiddleware, logout);
router.get("/", allRestaurants);

module.exports = router;
