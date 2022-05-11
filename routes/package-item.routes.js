const express = require("express");

const { getItems, getItem, getPackageItems } = require("../controllers/package-item.controllers")

const router = express.Router();

router.get("/item/:id", getItem)
router.get("/items/:package", getPackageItems)
// router.get("/:package/:restaurant", getItems)

module.exports = router;