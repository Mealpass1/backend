const express = require("express");

const { signup } = require("../controllers/restaurant.controllers");

const router = express.Router();

router.post("/signup", signup);

module.exports = router;
