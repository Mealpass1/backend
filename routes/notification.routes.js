const express = require("express");

const {
  subscribe,
  notifications,
} = require("../controllers/notification.controllers");
const dinerAuth = require("../middlewares/diner.auth");

const router = express.Router();

router.get("/", dinerAuth, notifications);
router.post("/subscribe", dinerAuth, subscribe);

module.exports = router;
