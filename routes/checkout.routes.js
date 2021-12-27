const express = require('express');
const router = express.Router();
const {authorizeRole,protectRoute} = require('../middlewares/auth.middleware');
const {addToCheckOutController,getCheckOutsController} = require('../controllers/checkout.controller');


/**
 * @swagger
 * components:
 *   schemas:
 *    Checkout:
 *       type: object
 *       required:
 *         -mealCost
 *         -ServiceFee
 *         -Taxes
 *         -Total  
 *         -products
 *       properties:
 *         id:
 *           type: String
 *           description: auto generated id by mongodb.
 *         mealCost:
 *           type: Number
 *           description: mealcost is the price total prices of all dishes added to cart plus prices of all toppings.
 *           required: true
 *         ServiceFee:
 *           type: Number
 *           description: ServiceFee is money for helping you to use our platforam. it 10% of your singal transaction
 *           required: true
 *         Taxes:
 *           type: Number
 *           description: Our platform is free of taxes. we will pay for you taxes.
 *           required: false
 *         Total:
 *           type: Number
 *           description: This is the total after taking total charges for transactions minus our service fee.
 *           required: true   
 *         products:
 *           type: Array
             description: This contains an array for products that a user checkedout
 *            
 */

/**
 * @swagger
 * tags:
 *   name: Checkout
 *   description: checkout managing apis
 */

/**
 * @swagger
 * /checkout:
 *   get:
 *     summary: Returns the list of all transactions in the database. it is a protected route to access it you should be normal user as your role
 *     tags: [Checkout]
 *     responses:
 *       200:
 *         description: The list of all transactions
 *         content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Checkout'
 */

/**
 * @swagger
 * /checkout/{id}:
 *   get:
 *     summary: Get the transaction by id
 *     tags: [Checkout]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: String
 *         required: true
 *         description: The id of a transaction you want to get
 *     responses:
 *       200:
 *         description: Trasaction description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Checkout'
 *       400:
 *         description: transaction not found 
 */

/**
 * @swagger
 * /checkout:
 *   post:
 *     summary: Create a new transaction 
 *     tags: [Checkout]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Checkout'
 *     responses:
 *       200:
 *         description:   transaction  successfully created
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Checkout'
 *       500:
 *         description:  Server error
 */


router.route('/').post(protectRoute,authorizeRole("normal"),addToCheckOutController).get(protectRoute,authorizeRole("normal"),getCheckOutsController);

exports.checkoutRoutes = router;
