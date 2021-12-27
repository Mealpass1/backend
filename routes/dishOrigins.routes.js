const express = require('express');
const router = express.Router();
const {protectRoute,authorizeRole} = require('../middlewares/auth.middleware');
const {dishOriginRegistrationController,deleteDishOriginController,getAllDishesOrigins,getDishOriginById} = require('../controllers/dishOrigins.controller');




/**
 * @swagger
 * components:
 *   schemas:
 *    dishOrigins:
 *       type: object
 *       required:
 *         -dishOriginNumber
 *         -dishOriginName
 *       properties:
 *         id:
 *           type: String
 *           description: auto generated id by mongodb.
 *         dishOriginNumber:
 *           type: Number
 *           description: this is the number selected on the form when a restaurant user is registering new dish origin like chines, spanish etc.
 *           required: true
 *         dishOriginName:
 *           type: String
 *           description: this is the name associated with the number above.
 *           required: true
 *         dishOriginDescription:
 *           type: String
 *           description: This defines small description of a new origin created . it is at least 20 characters and at most 255 characters
 *           max: 255
 *           min: 20
 *           required: false            
 */

/**
 * @swagger
 * tags:
 *   name: dishOrigins
 *   description: dish origins managing apis
 */

/**
 * @swagger
 * /dish/origin:
 *   get:
 *     summary: Returns the list of all dish origins in the database. it is a protected route to access it you should be admin as your role
 *     tags: [dishOrigins]
 *     responses:
 *       200:
 *         description: The list of all dish origins
 *         content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/dishOrigins'
 */

/**
 * @swagger
 * /dish/origin/{id}:
 *   get:
 *     summary: Get the dish origin by its id
 *     tags: [dishOrigins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: String
 *         required: true
 *         description: The id of a dish origin you want to get
 *     responses:
 *       200:
 *         description: Dish origin description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/dishOrigins'
 *       400:
 *         description: dish origin not found 
 */

/**
 * @swagger
 * /dish/origin/create:
 *   post:
 *     summary: Create a new dish origin
 *     tags: [dishOrigins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/dishOrigin'
 *     responses:
 *       200:
 *         description:   dish origins  successfully created
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/dishOrigin'
 *       500:
 *         description:  Server error
 */

/**
 * @swagger
 * /dish/origin/{id}:
 *   delete:
 *     summary: Removing  a dish origin by id
 *     tags: [dishOrigins]
 *     parameters:
 * 
 */

router.route('/').get(protectRoute,authorizeRole("admin"),getAllDishesOrigins);
router.route('/create').post(protectRoute,authorizeRole("admin"),dishOriginRegistrationController);
router.route('/:id').delete(protectRoute,authorizeRole("admin"),deleteDishOriginController).get(protectRoute,authorizeRole("admin"),getDishOriginById);
exports.dishOriginRoutes = router;