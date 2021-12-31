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
router.put("/logout/:id", authMiddleware, logout);
router.get("/", allDiners);
router.get("/:id", authMiddleware, oneDiner);

module.exports = router;
