const express = require("express");
const router = express.Router();
const {
  addToCartController,
  getCartDishesController,
  deleteCartController,
  editCartontroller,
  getCartDishesByIdController,
  getCartDishByIdController,
} = require("../controllers/cart.controller");
const {
  authorizeRole,
  protectRoute,
} = require("../middlewares/auth.middleware");

/**
 * @swagger
 * components:
 *   schemas:
 *    Cart:
 *       type: object
 *       required:
 *         -dishId
 *         -dishName
 *         -userId
 *         -quantity
 *         -price
 *         -total
 *         -imgUrl
 *       properties:
 *         id:
 *           type: String
 *           description: auto generated id by mongodb.
 *         dishId:
 *           type: String
 *           description: this is the id of a dish you want to add in cart. it should come as a parameter in url
 *           required: true
 *         dishName:
 *           type: string
 *           description: This is the name of dish added to cart. it is selected from database where id==dishId
 *           required: true
 *         userId:
 *           type: String
 *           description: This id is taken from the token passed to the user who is logged in
 *           required: true
 *         quantity:
 *           type: Number
 *           description: This the qauntity of a dish a user wants to add on cart.
 *           required: true
 *         price:
 *           type: Number
 *           description: This price is selected from dishes model where id==dishId
 *           required: true
 *
 *         total:
 *           type: Number,
 *           description: This is the total price of dishes' price and toppings
 *           required: true
 *         imgUrl:
 *           type: String,
 *           description: imgUrl is renderd from dishes model where _id==dishId
 *
 *         timeOfMeal:
 *           type: String
 *           description: this specifies the time a meal will be ready. lunch,breakfast etc
 *           required: false
 *
 *         daysInWeek:
 *           type: Array
 *           description: this is an enum array containing days of week. if you put a value not in this array, it will be error
 *           required: false
 *
 *         NumberOfRepetition:
 *           type: String,
 *           description: this specified number of repetition when a dish could be prepared for you
 *           required: false
 *
 *         additionalTopping:
 *           type: Array
 *           description: This an array of object containing toppings and their corresponding prices
 *           required: false
 */

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: cart managing apis
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Returns the list of all carts in the database. it is a protected route to access it you should be normal as your role
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: The list of all carts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 */

/**
 * @swagger
 * /cart/user:
 *   get:
 *     summary: Returns the list of all carts in the database created by a certain user. it is a protected route to access it you should be normal as your role
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: The list of all carts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 */

/**
 * @swagger
 * /cart/{id}:
 *   get:
 *     summary: Get the cart by id
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: String
 *         required: true
 *         description: The id of a cart you want to get
 *     responses:
 *       200:
 *         description: Cart description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: cart not found
 */

/**
 * @swagger
 * /cart/{id}:
 *   post:
 *     summary: Create a new cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       200:
 *         description:   cart  successfully created
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Cart'
 *       500:
 *         description:  Server error
 */

/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     summary: Removing  a cart by id
 *     tags: [Cart]
 *     parameters:
 *
 */

router
  .route("/")
  .get(protectRoute, authorizeRole("normal"), getCartDishesController);
router
  .route("/user")
  .get(protectRoute, authorizeRole("normal"), getCartDishesByIdController);
router
  .route("/:id")
  .post(protectRoute, authorizeRole("normal"), addToCartController)
  .get(protectRoute, authorizeRole("normal"), getCartDishByIdController)
  .delete(protectRoute, authorizeRole("normal"), deleteCartController);
router
  .route("/edit/:id")
  .put(protectRoute, authorizeRole("normal"), editCartontroller);
exports.cartRoutes = router;
