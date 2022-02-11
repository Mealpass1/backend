const express = require("express");

const {
  getMenu,
  getOrder,
  shareOrder,
  acceptShare,
  declineShare,
} = require("../controllers/menu.controllers.js");

const authMiddleware = require("../middlewares/diner.auth");

const router = express.Router();

router.get("/", authMiddleware, getMenu);
router.get("/:id", authMiddleware, getOrder);
router.post("/share", authMiddleware, shareOrder);
router.post("/accept", authMiddleware, acceptShare);
router.post("/decline", authMiddleware, declineShare);

module.exports = router;
