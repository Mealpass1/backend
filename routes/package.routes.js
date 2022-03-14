const express = require("express");

const {
  create,
  packages,
  package,
} = require("../controllers/package.controller");

const authMiddleware = require("../middlewares/admin.auth");

const router = express.Router();

router.post("/create", authMiddleware, create);
router.get("/", packages);
router.get("/:id", package);

module.exports = router;
