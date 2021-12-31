const express = require("express");

const { create } = require("../controllers/order.controllers");

const authMiddleware = require("../middlewares/diner.auth");

const router = express.Router();

router.post("/add", authMiddleware, create);

module.exports = router;
