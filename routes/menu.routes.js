const express = require("express");

const { getMenu, getOrder } = require("../controllers/menu.controllers.js");

const authMiddleware = require("../middlewares/diner.auth");

const router = express.Router();

router.get("/", authMiddleware, getMenu);
router.get("/:id", authMiddleware, getOrder);

module.exports = router;
