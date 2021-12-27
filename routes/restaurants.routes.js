const express = require("express");
const router = express.Router();
const {
  protectRestaurantRoute,
  authorizeRestaurantRole,
} = require("../middlewares/auth.middleware");
const {
  createNewRestaurantController,
  getAllRestaurantsController,
  getRestrauntByIdController,
  deleteRestrauntController,
  updateRestaurantController,
  LoginRestaurantController,
} = require("../controllers/restaurants.controller");
const upload = require("../middlewares/upload.middleware");
/**
 * @swagger
 * components:
 *   schemas:
 *    Restaurants:
 *       type: object
 *       required:
 *         -Business_name
 *         -Email
 *         -Username
 *         -Password
 *         -Office_address
 *       properties:
 *         id:
 *           type: String
 *           description: auto generated id by mongodb.
 *         Business_name:
 *           type: String
 *           description: This the name of the restraunt. it is required. no further validation since this permissions is given to a trusted person who is super admin
 *           required: true
 *         Email:
 *           type: string
 *           description: This is the email of the restraunt. it should be a valid email
 *           required: true
 *         Username:
 *           type: String
 *           description: This is the username  that will appear on restaurants page
 *           required: true
 *         Password:
 *           type: String
 *           description: This the password for restaurant to login. it is hashed. You need to validate if it contains,characters,numbers, symbols... it should at most be 255 and 8 characters at least
 *           required: true
 *         Office_address:
 *           type: String
             description: This is the address where restaurant is operating from
 *
 */

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: restaurants managing apis
 */

/**
 * @swagger
 * /restaurant/create:
 *   post:
 *     summary: creating a new restaurant.
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurants'
 *     responses:
 *       200:
 *         description:   Restraunt  successfully created
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Restaurants'
 *       500:
 *         description:  Server error
 */

/**
 * @swagger
 * /restaurant/login:
 *   post:
 *     summary: Login route. restaurant enters Email and Password
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurants'
 *     responses:
 *       200:
 *         description:   restaurant Loggedin successfully
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Restaurants'
 *       500:
 *         description:  Server error
 */

/**
 * @swagger
 * /restaurant:
 *   get:
 *     summary: Returns the list of all restaurants in the database. it is a protected route to access it you should be super admin as your role
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: The list of all restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurants'
 */

/**
 * @swagger
 * /restaurant/{id}:
 *   get:
 *     summary: Get the a restaurant  by its id. it is protected and can only be accessed by super admin and normal users
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: String
 *         required: true
 *         description: The id of a restaurant you want to get
 *     responses:
 *       200:
 *         description: Restaurant description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurants'
 *       400:
 *         description: restaurant not found
 */

/**
 * @swagger
 * /restaurant/{id}:
 *   delete:
 *     summary: Removing  a restraunt by using its id
 *     tags: [Restaurants]
 *     parameters:
 *
 */
router.route("/create").post(createNewRestaurantController);
router.route("/").get(getAllRestaurantsController);
router.route("/login").post(LoginRestaurantController);
router
  .route("/:id")
  .get(getRestrauntByIdController)
  .delete(
    protectRestaurantRoute,
    authorizeRestaurantRole("super admin", "admin"),
    deleteRestrauntController
  )
  .put(
    protectRestaurantRoute,
    authorizeRestaurantRole("super admin", "admin"),
    updateRestaurantController
  );
exports.restaurantsRoutes = router;
