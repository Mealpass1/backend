const express = require("express");

const { signup, login, getAdmin } = require("../controllers/admin.controllers");
const adminAuth = require("../middlewares/admin.auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/", adminAuth, getAdmin);

module.exports = router;
