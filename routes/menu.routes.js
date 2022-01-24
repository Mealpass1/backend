const express = require("express");

const {
  getMenu,
  getOrder,
  shareOrder,
} = require("../controllers/menu.controllers.js");

const authMiddleware = require("../middlewares/diner.auth");

const router = express.Router();

router.get("/", authMiddleware, getMenu);
router.get("/:id", authMiddleware, getOrder);
router.post("/share", authMiddleware, shareOrder);

module.exports = router;
