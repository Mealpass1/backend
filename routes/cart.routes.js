const express = require("express");

const authMiddleware = require("../middlewares/diner.auth");

const {
  oneDish,
  addDish,
  getAll,
  deleteDish,
  deletePackage,
  updateDish,
  updateMealServing,
  package,
} = require("../controllers/cart.controllers");

const router = express.Router();

router.get("/:id", oneDish);
router.get("/", authMiddleware, getAll);
router.post("/add", authMiddleware, addDish);
router.post("/package", authMiddleware, package);
router.put("/update/:id", authMiddleware, updateDish);
router.delete("/delete/:id", authMiddleware, deleteDish);
router.delete("/deletepackage/:package", authMiddleware, deletePackage);
router.put("/updatemealserving/:id", authMiddleware, updateMealServing);

module.exports = router;
