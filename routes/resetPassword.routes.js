const express = require('express');
const router = express.Router();


const {resetPasswordController} = require('../controllers/resetPassword.controller');
router.route('/').post(resetPasswordController);
exports.resetPasswordRoute = router;

