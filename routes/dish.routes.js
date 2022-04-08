const express = require("express");

const {
  createDish,
  allDishes,
  oneDish,
  deleteDish,
} = require("../controllers/dish.controllers");

const authMiddleware = require("../middlewares/restaurant.auth");

const upload = require("../services/image.service");

const router = express.Router();

router.post("/add", authMiddleware, upload.single("picture"), createDish);
router.get("/restaurant/:id", allDishes);
router.get("/:id", oneDish);
router.delete("/:id", authMiddleware, deleteDish);

module.exports = router;
