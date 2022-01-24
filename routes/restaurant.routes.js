const express = require("express");

const {
  signup,
  login,
  logout,
  allRestaurants,
  oneRestaurant,
  update,
} = require("../controllers/restaurant.controllers");

const authMiddleware = require("../middlewares/restaurant.auth");
const upload = require("../services/image.service");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/logout", authMiddleware, logout);
router.get("/", allRestaurants);
router.get("/:id", oneRestaurant);
router.put("/update", authMiddleware, upload.single("picture"), update);

module.exports = router;
