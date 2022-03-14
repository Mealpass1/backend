const express = require("express");

const { signup, login, getAdmin } = require("../controllers/admin.controllers");
const {
  oneDish,
  addDish,
  getAll,
  deleteDish,
  updateDish,
  updateMealServing,
} = require("../controllers/admin-cart.controllers");

const adminAuth = require("../middlewares/admin.auth");

const router = express.Router();

//admin routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/", adminAuth, getAdmin);

//cart routes
router.post("/cart/add", adminAuth, addDish);
router.get("/cart/", adminAuth, getAll);
router.delete("/cart/delete/:id", adminAuth, deleteDish);
router.put("/cart/update/:id", adminAuth, updateDish);
router.put("/cart/updatemealserving/:id", adminAuth, updateMealServing);
router.get("/cart/:id", oneDish);

module.exports = router;
