const express = require('express');
const {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
} = require('../controllers/role');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the role
 *         name:
 *           type: string
 *           description: Role name
 *           enum: [ADMIN, MANAGER, CUSTOMER]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the role was created
 *       example:
 *         id: 60d0fe4f5311236168a109ca
 *         name: ADMIN
 *         createdAt: 2021-01-01T00:00:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: The roles managing API
 */

/**
 * @swagger
 * /api/v1/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - id
 *                   - name
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The auto-generated id of the role
 *                     default: 60d0fe4f5311236168a109ca
 *                   name:
 *                     type: string
 *                     description: Role name
 *                     enum: [ADMIN, MANAGER, CUSTOMER]
 *                     default: ADMIN
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date the role was created
 *                     default: 2021-01-01T00:00:00.000Z
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 */
router.get('/', authorize('ADMIN'), getRoles);

/**
 * @swagger
 * /api/v1/roles/{id}:
 *   get:
 *     summary: Get the role by id
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 60c72b2f9b1d8e1d88c3f7a2
 *         required: true
 *         description: The role id
 *     responses:
 *       200:
 *         description: The role description by id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - name
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the role
 *                   default: 60d0fe4f5311236168a109ca
 *                 name:
 *                   type: string
 *                   description: Role name
 *                   enum: [ADMIN, MANAGER, CUSTOMER]
 *                   default: ADMIN
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the role was created
 *                   default: 2021-01-01T00:00:00.000Z
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 *       404:
 *         description: The role was not found
 */
router.get('/:id', authorize('ADMIN'), getRoleById);

/**
 * @swagger
 * /api/v1/roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
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
 *             properties:
 *               name:
 *                 type: string
 *                 description: Role name
 *                 enum: [ADMIN, MANAGER, CUSTOMER]
 *                 default: ADMIN
 *     responses:
 *       201:
 *         description: The role was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - name
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the role
 *                   default: 60d0fe4f5311236168a109ca
 *                 name:
 *                   type: string
 *                   description: Role name
 *                   enum: [ADMIN, MANAGER, CUSTOMER]
 *                   default: ADMIN
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the role was created
 *                   default: 2021-01-01T00:00:00.000Z
 *       400:
 *         description: Bad request
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 */
router.post('/', authorize('ADMIN'), createRole);

/**
 * @swagger
 * /api/v1/roles/{id}:
 *   put:
 *     summary: Update the role by id
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 60c72b2f9b1d8e1d88c3f7a2
 *         required: true
 *         description: The role id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Role name
 *                 enum: [ADMIN, MANAGER, CUSTOMER]
 *                 default: ADMIN
 *     responses:
 *       200:
 *         description: The role was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - name
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the role
 *                   default: 60d0fe4f5311236168a109ca
 *                 name:
 *                   type: string
 *                   description: Role name
 *                   enum: [ADMIN, MANAGER, CUSTOMER]
 *                   default: ADMIN
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the role was created
 *                   default: 2021-01-01T00:00:00.000Z
 *       400:
 *         description: Bad request
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 *       404:
 *         description: The role was not found
 */
router.put('/:id', authorize('ADMIN'), updateRole);

/**
 * @swagger
 * /api/v1/roles/{id}:
 *   delete:
 *     summary: Delete the role by id
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 60c72b2f9b1d8e1d88c3f7a2
 *         required: true
 *         description: The role id
 *     responses:
 *       200:
 *         description: The role was successfully deleted
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 *       404:
 *         description: The role was not found
 */
router.delete('/:id', authorize('ADMIN'), deleteRole);

module.exports = router;
