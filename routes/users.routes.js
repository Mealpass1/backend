const express = require('express');
const router = express.Router();
const {UserRegistrationController,UserLoginController,deleteUserController,getAllUsers,getUserById,updateUser} = require('../controllers/users.controller');
const {protectRoute,authorizeRole} = require('../middlewares/auth.middleware');
const {headers}  = require('../middlewares/cors.middleware');



/**
 * @swagger
 * components:
 *   schemas:
 *    Users:
 *       type: object
 *       required:
 *         -fullname
 *         -email
 *         -username
 *         -password  
 *       properties:
 *         id:
 *           type: String
 *           description: auto generated id by mongodb.
 *         fullname:
 *           type: String
 *           description: this name is required on signup page as the first field. it should at least be 3 and at most be 35 characters
 *           max: 35
 *           min: 3
 *           required: true
 *         email:
 *           type: string
 *           description: email should be a valid email and you must validate it on frontend. it should at least be 15 and at most be 50 characters
 *           max: 50
 *           min: 15
 *           required: true
 *         username:
 *           type: String
 *           description: This is the name that will appear on our platform. it should at least be 5 and at most be 15 characters
 *           max: 15
 *           min: 5
 *           required: true
 *         password:
 *           type: String
 *           description: This the password for user to login. it is hashed. You need to validate if it contains,characters,numbers, symbols... it should at most be 255 and 8 characters at least
 *           required: true   
 *         role:
 *           type: String
             description: By default the user has a role of normal when the role is updated to admin then there are some protected routes that the user can access
 *            
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: users managing apis
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Returns the list of all users in the database. it is a protected route to access it you should be admin as your role
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of all users
 *         content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: String
 *         required: true
 *         description: The id of a user you want to get
 *     responses:
 *       200:
 *         description: User description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: user not found 
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create a new user 
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description:   user  successfully created
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Users'
 *       500:
 *         description:  Server error
 */


/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login route. user enters username and password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description:   user Loggedin successfully
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Users'
 *       500:
 *         description:  Server error
 */



/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Removing  a user by id
 *     tags: [Users]
 *     parameters:
 * 
 */


router.route('/').get(protectRoute,authorizeRole("admin","super admin"),getAllUsers);
router.route('/signup').post(UserRegistrationController);
router.route('/login').post(UserLoginController);
router.route('/:id',).delete(protectRoute,authorizeRole("normal","super admin"),deleteUserController).get(protectRoute,authorizeRole("normal","super admin"),getUserById);
exports.usersRoutes = router;