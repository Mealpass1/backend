const express = require("express");

const { subscribe } = require("../controllers/notification.controllers");
const dinerAuth = require("../middlewares/diner.auth");

const router = express.Router();

router.post("/subscribe", dinerAuth, subscribe);

module.exports = router;
