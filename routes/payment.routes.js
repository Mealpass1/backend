const express = require('express')
const router = express.Router()
const { paymentController } = require('../controllers/payment.controller')
const { authorizeRole, protectRoute } = require('../middlewares/auth.middleware')

/**
 * @swagger
 * /payment:
 *   post:
 *     summary: payment method, it is not working we are waiting for issues to be solved
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       200:
 *         description:  payment verified
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Payment'
 *       500:
 *         description:  Server error
 */

router.route('/').get(paymentController)
exports.paymentRoutes = router
