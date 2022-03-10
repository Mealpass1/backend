const express = require("express");

const authMiddleware = require("../middlewares/diner.auth");

const {
  signup,
  login,
  logout,
  allDiners,
  oneDiner,
} = require("../controllers/diner.controllers");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/logout", authMiddleware, logout);
router.get("/diners", allDiners);
router.get("/", authMiddleware, oneDiner);

module.exports = router;
