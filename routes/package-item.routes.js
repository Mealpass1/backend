const express = require("express");

const { getItems, getItem } = require("../controllers/package-item.controllers")

const router = express.Router();

router.get("/:package/:restaurant", getItems)
router.get("/:id", getItem)

module.exports = router;