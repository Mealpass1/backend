const express = require("express");

const {
  createDish,
  allDishes,
  oneDish,
} = require("../controllers/dish.controllers");

const authMiddleware = require("../middlewares/restaurant.auth");

const upload = require("../services/image.service");

const router = express.Router();

router.post("/add", authMiddleware, upload.single("picture"), (req, res) => {
  res.send(req.file);
});

router.get("/", allDishes);
router.get("/:id", oneDish);

module.exports = router;
