const express = require('express');
const router = express.Router();
const {dishRegistrationController,deleteDishController,getAllDishes,getDishByRestaurantController,getDishById} = require('../controllers/dish.controller');
const {protectRestaurantRoute ,authorizeRole,protectRoute,authorizeRestaurantRole} = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');



/**
 * @swagger
 * components:
 *   schemas:
 *    Dishes:
 *       type: object
 *       required:
 *         -restaurant_id
 *         -dishName
 *         -dishCategory
 *         -dishOrigin
 *         -dishDescription  
 *       properties:
 *         id:
 *           type: String
 *           description: auto generated id by mongodb.
 *         dishName:
 *           type: String
 *           description: this is the name of a dish. it should at least be 5 and at most be 18 characters
 *           max: 18
 *           min: 5
 *           required: true
 *         dishCategory:
 *           type: String
 *           description: this defines the category of the dish. it should be a valid category from the categories model
 *           required: true
 *         dishOrigin:
 *           type: String
 *           description: This is the origin of the dish for example chines,spanish etc . it should be a valid origin from origins model
 *           required: true
 *         dishDescription:
 *           type: String
 *           description: this is a simple description of the dish for examples constituents of the dish. it should be at least 20 characters and at most 255 characters
 *           required: true
 *         restaurant_id:
 *           type: String
 *           description: This is the id of the restaurant which is creating the dish. this id will help in publishing dishes created by a certain restaurant            
 */

/**
 * @swagger
 * tags:
 *   name: Dishes
 *   description: dishes managing apis
 */

/**
 * @swagger
 * /dish:
 *   get:
 *     summary: Returns the list of all dishes in the database. it is a protected route to access it you should be admin as your role
 *     tags: [Dishes]
 *     responses:
 *       200:
 *         description: The list of all dishes
 *         content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dishes'
 */



/**
 * @swagger
 * /dish/{id}:
 *   get:
 *     summary: Get the dish created by a certain restaurant. you should provide restaurant id.
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: String
 *         required: true
 *         description: The id of a dish you want to get
 *     responses:
 *       200:
 *         description: Dish description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dishes'
 *       400:
 *         description: dish not found 
 */

/**
 * @swagger
 * /dish/create:
 *   post:
 *     summary: Create a new dish. 
 *     tags: [Dishes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dishes'
 *     responses:
 *       200:
 *         description:   dish  successfully created
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Dishes'
 *       500:
 *         description:  Server error
 */

/**
 * @swagger
 * /dish/{id}:
 *   delete:
 *     summary: Removing  a dish by id
 *     tags: [Dishes]
 *     parameters:
 * 
 */





router.route('/').get(getAllDishes);
router.route('/restaurant/:id').get(getDishByRestaurantController);
router.route('/:id').get(getDishById);
router.route('/create').post(protectRestaurantRoute,authorizeRestaurantRole("admin"),upload.single("picture"),dishRegistrationController);
router.route('/:id').delete(deleteDishController).get(getDishById);
exports.dishesRoutes = router;
