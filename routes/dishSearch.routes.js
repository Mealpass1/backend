const express = require('express');
const router = express.Router();
const {dishSearchController} = require('../controllers/dishSearch.controller');



/**
 * @swagger
 * /search:
 *   post:
 *     summary: searching a given dish from database. the dishName is required from body
 *     tags: [Dishes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dishes'
 *     responses:
 *       200:
 *         description:   successful search
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Dishes'
 *       500:
 *         description:  Server error
 */

router.route('/').post(dishSearchController);
exports.dishSearchRoute = router;