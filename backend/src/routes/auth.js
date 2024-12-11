const express = require('express');
const { login, register, logout, getMe, updateDetails } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 default: jane.doe@example.com
 *               password:
 *                 type: string
 *                 default: Qwerty213
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 token:
 *                   type: string
 *                   default: eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp9.eyJpZCI6IjY2NWRiYjJhNjIyNTU0MjBiYzU3ZGM4MCI6MTcxNzYwMDc3OCwiZXhwNzIwMTkyNzc4fQ.E__fOssTfdtr766b7HFQiO84Cbkkkak8TZBx4HBvYeQ
 *       401:
 *         description: Invalid credentials
 *       400:
 *         description: Please provide an email and password
 */
router.post('/login', login);

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - address
 *               - login
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 default: Jane Doe
 *               email:
 *                 type: string
 *                 default: jane.doe@example.com
 *               phone:
 *                 type: string
 *                 default: 69385087123
 *               address:
 *                 type: string
 *                 default: 9007 Stewart View, Tylerport, ID 12734
 *               login:
 *                 type: string
 *                 default: jane-doe
 *               password:
 *                 type: string
 *                 default: Qwerty213
 *               role:
 *                 type: string
 *                 default: 665dbb3e62255420bc57dc95
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 token:
 *                   type: string
 *                   default: eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp9.eyJpZCI6IjY2NWRiYjJhNjIyNTU0MjBiYzU3ZGM4CI6MTcxNzYwMDc3OCwiZXhwNzIwMTkyNzc4fQ.E__fOssTfdtr766b7HFQiO84Cbkkkak8TZBx4HBvYeQ
 *       400:
 *         description: Invalid input
 */
router.post('/register', register);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   get:
 *     summary: Logout a user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   default: {}
 */
router.get('/logout', logout);

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: Get current logged in user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       default: 665dbb2a62255420bc57dc80
 *                     name:
 *                       type: string
 *                       default: Jane Doe
 *                     email:
 *                       type: string
 *                       default: jane.doe@example.com
 *                     phone:
 *                       type: string
 *                       default: 69385087123
 *                     address:
 *                       type: string
 *                       default: 9007 Stewart View, Tylerport, ID 12734
 *                     login:
 *                       type: string
 *                       default: jane-doe
 *                     role:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           default: 665dbb3e62255420bc57dc95
 *                         name:
 *                           type: string
 *                           default: CUSTOMER
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date the user was created
 *                       default: 2024-05-31T00:00:00.000Z
 *       401:
 *         description: Not authorized to access this route
 */
router.get('/me', protect, getMe);

/**
 * @swagger
 * /api/v1/auth/update-details:
 *   put:
 *     summary: Update user details
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 default: Jane Doe
 *               email:
 *                 type: string
 *                 default: jane.doe@example.com
 *               phone:
 *                 type: string
 *                 default: 69385087123
 *               address:
 *                 type: string
 *                 default: 9007 Stewart View, Tylerport, ID 12734
 *               login:
 *                 type: string
 *                 default: jane-doe
 *     responses:
 *       200:
 *         description: User details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       default: 665dbb2a62255420bc57dc80
 *                     name:
 *                       type: string
 *                       default: Jane Doe
 *                     role:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           default: 665dbb3e62255420bc57dc95
 *                         name:
 *                           type: string
 *                           default: CUSTOMER
 *                     email:
 *                       type: string
 *                       default: jane.doe@example.com
 *                     phone:
 *                       type: string
 *                       default: 69385087123
 *                     address:
 *                       type: string
 *                       default: 007 Stewart View, Tylerport, ID 12734
 *                     login:
 *                       type: string
 *                       default: jane-doe
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date the user was updated
 *                       default: 2024-05-31T00:00:00.000Z
 *       401:
 *         description: Not authorized to access this route
 */
router.put('/update-details', protect, updateDetails);

module.exports = router;
