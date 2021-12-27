const express = require('express');
const router = express.Router();
const {protectRestaurantRoute,authorizeRestaurantRole} = require('../middlewares/auth.middleware');
const {dishCategoryRegistrationController,deleteDishCategoryController,getAllDishesCategories,getDishCategoryById} = require('../controllers/dishCategoriesController');



/**
 * @swagger
 * components:
 *   schemas:
 *    dishCategories:
 *       type: object
 *       required:
 *         -categoryNumber
 *         -categoryName
 *         -categoryDescription 
 *       properties:
 *         id:
 *           type: String
 *           description: auto generated id by mongodb.
 *         categoryNumber:
 *           type: Number
 *           description: this is the number selected on the form when a restaurant user is registering new dish category like drinks, food.
 *           required: true
 *         categoryName:
 *           type: String
 *           description: this is the name associated with the number above.
 *           required: true
 *         categoryDescription:
 *           type: String
 *           description: This defines small description of a new category created . it is at least 20 characters and at most 255 characters
 *           max: 255
 *           min: 20
 *           required: false            
 */

/**
 * @swagger
 * tags:
 *   name: dishCategories
 *   description: dish categories managing apis
 */

/**
 * @swagger
 * /dish/category/categories:
 *   get:
 *     summary: Returns the list of all dish categories in the database. it is a protected route to access it you should be admin as your role
 *     tags: [dishCategories]
 *     responses:
 *       200:
 *         description: The list of all dish categories
 *         content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/dishCategories'
 */

/**
 * @swagger
 * /dish/category/{id}:
 *   get:
 *     summary: Get the dish category by its id
 *     tags: [dishCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: String
 *         required: true
 *         description: The id of a dish category you want to get
 *     responses:
 *       200:
 *         description: Dish category description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/dishCategories'
 *       400:
 *         description: dish category not found 
 */

/**
 * @swagger
 * /dish/category/create:
 *   post:
 *     summary: Create a new dish 
 *     tags: [dishCategories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/dishCategories'
 *     responses:
 *       200:
 *         description:   dish category  successfully created
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/dishCategory'
 *       500:
 *         description:  Server error
 */

/**
 * @swagger
 * /dish/category/{id}:
 *   delete:
 *     summary: Removing  a dish category by id
 *     tags: [dishCategories]
 *     parameters:
 * 
 */
router.route('/categories').get(getAllDishesCategories);
router.route('/create').post(protectRestaurantRoute,authorizeRestaurantRole("admin"),dishCategoryRegistrationController);
router.route('/:id').delete(protectRestaurantRoute,authorizeRestaurantRole("admin"),deleteDishCategoryController).get(getDishCategoryById);
exports.dishCategoriesRoutes = router;