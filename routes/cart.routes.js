const express = require("express");

const authMiddleware = require("../middlewares/diner.auth");

const {
  addDish,
  getAll,
  deleteDish,
  updateDish,
  updateMealServing,
} = require("../controllers/cart.controllers");

const router = express.Router();

router.post("/add", authMiddleware, addDish);
router.get("/", authMiddleware, getAll);
router.delete("/delete/:id", authMiddleware, deleteDish);
router.put("/update/:id", authMiddleware, updateDish);
router.put("/updatemealserving/:id", authMiddleware, updateMealServing);

module.exports = router;
