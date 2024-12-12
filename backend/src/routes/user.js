const express = require('express');
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/user');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - role
 *         - email
 *         - phone
 *         - address
 *         - login
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         role:
 *           type: object
 *           description: The role id associated with the user
 *           properties:
 *             id:
 *               type: string
 *               description: The role id associated with the user
 *             name:
 *               type: string
 *               default: The role name associated with the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         phone:
 *           type: string
 *           description: The phone number of the user
 *         address:
 *           type: string
 *           description: The address of the user
 *         login:
 *           type: string
 *           description: The login of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *           writeOnly: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was created
 *       example:
 *         id: 60d0fe4f5311236168a109ca
 *         name: John Doe
 *         role:
 *           id: 665dbb2a62255420bc57dc8f
 *           name: ADMIN
 *         email: john.doe@example.com
 *         phone: "1234567890"
 *         address: "123 Main Street"
 *         login: johndoe
 *         password: secret123
 *         createdAt: 2021-01-01T00:00:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - id
 *                   - name
 *                   - role
 *                   - email
 *                   - phone
 *                   - address
 *                   - login
 *                   - password
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The auto-generated id of the user
 *                     default: 60d0fe4f5311236168a109ca
 *                   name:
 *                     type: string
 *                     description: The name of the user
 *                     default: John Doe
 *                   role:
 *                     type: object
 *                     description: The role id associated with the user
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The role id associated with the user
 *                         default: 665dbb2a62255420bc57dc8f
 *                       name:
 *                         type: string
 *                         description: The role name associated with the user
 *                         default: ADMIN
 *                   email:
 *                     type: string
 *                     description: The email of the user
 *                     default: john.doe@example.com
 *                   phone:
 *                     type: string
 *                     description: The phone number of the user
 *                     default: "1234567890"
 *                   address:
 *                     type: string
 *                     description: The address of the user
 *                     default: "123 Main Street"
 *                   login:
 *                     type: string
 *                     description: The login of the user
 *                     default: johndoe
 *                   password:
 *                     type: string
 *                     description: The password of the user
 *                     writeOnly: true
 *                     default: secret123
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date the user was created
 *                     default: 2021-01-01T00:00:00.000Z
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 */
router.get('/', authorize('ADMIN', 'MANAGER'), getUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 60c72b2f9b1d8e1d88c3f7a2
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - name
 *                 - role
 *                 - email
 *                 - phone
 *                 - address
 *                 - login
 *                 - password
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the user
 *                   default: 60d0fe4f5311236168a109ca
 *                 name:
 *                   type: string
 *                   description: The name of the user
 *                   default: John Doe
 *                 role:
 *                   type: object
 *                   description: The role id associated with the user
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The role id associated with the user
 *                       default: 665dbb2a62255420bc57dc8f
 *                     name:
 *                       type: string
 *                       description: The role name associated with the user
 *                       default: ADMIN
 *                 email:
 *                   type: string
 *                   description: The email of the user
 *                   default: john.doe@example.com
 *                 phone:
 *                   type: string
 *                   description: The phone number of the user
 *                   default: "1234567890"
 *                 address:
 *                   type: string
 *                   description: The address of the user
 *                   default: "123 Main Street"
 *                 login:
 *                   type: string
 *                   description: The login of the user
 *                   default: johndoe
 *                 password:
 *                   type: string
 *                   description: The password of the user
 *                   writeOnly: true
 *                   default: secret123
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the user was created
 *                   default: 2021-01-01T00:00:00.000Z
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 *       404:
 *         description: The user was not found
 */
router.get('/:id', authorize('ADMIN', 'MANAGER'), getUserById);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - role
 *               - email
 *               - phone
 *               - address
 *               - login
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 default: John Doe
 *               role:
 *                 type: string
 *                 description: The role id associated with the user
 *                 default: 665dbb2a62255420bc57dc8f
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 default: john.doe@example.com
 *               phone:
 *                 type: string
 *                 description: The phone number of the user
 *                 default: "1234567890"
 *               address:
 *                 type: string
 *                 description: The address of the user
 *                 default: "123 Main Street"
 *               login:
 *                 type: string
 *                 description: The login of the user
 *                 default: johndoe
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 writeOnly: true
 *                 default: secret123
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - name
 *                 - role
 *                 - email
 *                 - phone
 *                 - address
 *                 - login
 *                 - password
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the user
 *                   default: 60d0fe4f5311236168a109ca
 *                 name:
 *                   type: string
 *                   description: The name of the user
 *                   default: John Doe
 *                 role:
 *                   type: object
 *                   description: The role id associated with the user
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The role id associated with the user
 *                       default: 665dbb2a62255420bc57dc8f
 *                     name:
 *                       type: string
 *                       description: The role name associated with the user
 *                       default: ADMIN
 *                 email:
 *                   type: string
 *                   description: The email of the user
 *                   default: john.doe@example.com
 *                 phone:
 *                   type: string
 *                   description: The phone number of the user
 *                   default: "1234567890"
 *                 address:
 *                   type: string
 *                   description: The address of the user
 *                   default: "123 Main Street"
 *                 login:
 *                   type: string
 *                   description: The login of the user
 *                   default: johndoe
 *                 password:
 *                   type: string
 *                   description: The password of the user
 *                   writeOnly: true
 *                   default: secret123
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the user was created
 *                   default: 2021-01-01T00:00:00.000Z
 *       400:
 *         description: Bad request
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 */
router.post('/', authorize('ADMIN', 'MANAGER'), createUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update the user by id
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 60c72b2f9b1d8e1d88c3f7a2
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - role
 *               - email
 *               - phone
 *               - address
 *               - login
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 default: John Doe
 *               role:
 *                 type: string
 *                 description: The role id associated with the user
 *                 default: 665dbb2a62255420bc57dc8f
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 default: john.doe@example.com
 *               phone:
 *                 type: string
 *                 description: The phone number of the user
 *                 default: "1234567890"
 *               address:
 *                 type: string
 *                 description: The address of the user
 *                 default: "123 Main Street"
 *               login:
 *                 type: string
 *                 description: The login of the user
 *                 default: johndoe
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 writeOnly: true
 *                 default: secret123
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - name
 *                 - role
 *                 - email
 *                 - phone
 *                 - address
 *                 - login
 *                 - password
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the user
 *                   default: 60d0fe4f5311236168a109ca
 *                 name:
 *                   type: string
 *                   description: The name of the user
 *                   default: John Doe
 *                 role:
 *                   type: object
 *                   description: The role id associated with the user
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The role id associated with the user
 *                       default: 665dbb2a62255420bc57dc8f
 *                     name:
 *                       type: string
 *                       description: The role name associated with the user
 *                       default: ADMIN
 *                 email:
 *                   type: string
 *                   description: The email of the user
 *                   default: john.doe@example.com
 *                 phone:
 *                   type: string
 *                   description: The phone number of the user
 *                   default: "1234567890"
 *                 address:
 *                   type: string
 *                   description: The address of the user
 *                   default: "123 Main Street"
 *                 login:
 *                   type: string
 *                   description: The login of the user
 *                   default: johndoe
 *                 password:
 *                   type: string
 *                   description: The password of the user
 *                   writeOnly: true
 *                   default: secret123
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the user was created
 *                   default: 2021-01-01T00:00:00.000Z
 *       400:
 *         description: Bad request
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 *       404:
 *         description: The user was not found
 */
router.put('/:id', authorize('ADMIN', 'MANAGER'), updateUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete the user by id
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 60c72b2f9b1d8e1d88c3f7a2
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user was successfully deleted
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 *       404:
 *         description: The user was not found
 */
router.delete('/:id', authorize('ADMIN', 'MANAGER'), deleteUser);

module.exports = router;
