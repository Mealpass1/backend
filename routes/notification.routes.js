const express = require("express");

const {
  subscribe,
  notifications,
  see,
} = require("../controllers/notification.controllers");
const dinerAuth = require("../middlewares/diner.auth");

const router = express.Router();

router.get("/", dinerAuth, notifications);
router.post("/subscribe", dinerAuth, subscribe);
router.post("/seen", dinerAuth, see);

module.exports = router;
