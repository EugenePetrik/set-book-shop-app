const express = require('express');
const {
  createBookingStatus,
  getBookingStatuses,
  getBookingStatusById,
  updateBookingStatus,
  deleteBookingStatus,
} = require('../controllers/bookingStatus');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * components:
 *   schemas:
 *     BookingStatus:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the booking status
 *         name:
 *           type: string
 *           description: The name of the booking status
 *           enum: ['SUBMITTED', 'REJECTED', 'APPROVED', 'CANCELED', 'IN_DELIVERY', 'COMPLETED']
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the booking status was created
 *       example:
 *         id: 60c72b2f9b1d8e1d88c3f7a2
 *         name: SUBMITTED
 *         createdAt: 2023-05-31T09:32:31.488Z
 */

/**
 * @swagger
 * tags:
 *   name: BookingStatuses
 *   description: The booking statuses managing API
 */

/**
 * @swagger
 * /api/v1/booking-statuses:
 *   get:
 *     summary: Returns the list of all the booking statuses
 *     tags: [BookingStatuses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the booking statuses
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
 *                     description: The auto-generated id of the booking status
 *                     default: 60c72b2f9b1d8e1d88c3f7a2
 *                   name:
 *                     type: string
 *                     description: The name of the booking status
 *                     enum: ['SUBMITTED', 'REJECTED', 'APPROVED', 'CANCELED', 'IN_DELIVERY', 'COMPLETED']
 *                     default: SUBMITTED
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date when the booking status was created
 *                     default: 2023-05-31T09:32:31.488Z
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 */
router.get('/', authorize('MANAGER'), getBookingStatuses);

/**
 * @swagger
 * /api/v1/booking-statuses/{id}:
 *   get:
 *     summary: Get the booking status by id
 *     tags: [BookingStatuses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 60c72b2f9b1d8e1d88c3f7a2
 *         required: true
 *         description: The booking status id
 *     responses:
 *       200:
 *         description: The booking status description by id
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
 *                   description: The auto-generated id of the booking status
 *                   default: 60c72b2f9b1d8e1d88c3f7a2
 *                 name:
 *                   type: string
 *                   description: The name of the booking status
 *                   enum: ['SUBMITTED', 'REJECTED', 'APPROVED', 'CANCELED', 'IN_DELIVERY', 'COMPLETED']
 *                   default: SUBMITTED
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date when the booking status was created
 *                   default: 2023-05-31T09:32:31.488Z
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 *       404:
 *         description: The booking status was not found
 */
router.get('/:id', authorize('MANAGER'), getBookingStatusById);

/**
 * @swagger
 * /api/v1/booking-statuses:
 *   post:
 *     summary: Create a new booking status
 *     tags: [BookingStatuses]
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
 *                 description: The name of the booking status
 *                 enum: ['SUBMITTED', 'REJECTED', 'APPROVED', 'CANCELED', 'IN_DELIVERY', 'COMPLETED']
 *                 default: SUBMITTED
 *     responses:
 *       201:
 *         description: The booking status was successfully created
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
 *                   description: The auto-generated id of the booking status
 *                   default: 60c72b2f9b1d8e1d88c3f7a2
 *                 name:
 *                   type: string
 *                   description: The name of the booking status
 *                   enum: ['SUBMITTED', 'REJECTED', 'APPROVED', 'CANCELED', 'IN_DELIVERY', 'COMPLETED']
 *                   default: SUBMITTED
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date when the booking status was created
 *                   default: 2023-05-31T09:32:31.488Z
 *       400:
 *         description: Bad request
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 */
router.post('/', authorize('MANAGER'), createBookingStatus);

/**
 * @swagger
 * /api/v1/booking-statuses/{id}:
 *   put:
 *     summary: Update the booking status by the id
 *     tags: [BookingStatuses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1d8e1d88c3f7a2"
 *         required: true
 *         description: The booking status id
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
 *                 description: The name of the booking status
 *                 enum: ['SUBMITTED', 'REJECTED', 'APPROVED', 'CANCELED', 'IN_DELIVERY', 'COMPLETED']
 *                 default: SUBMITTED
 *     responses:
 *       200:
 *         description: The booking status was updated
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
 *                   description: The auto-generated id of the booking status
 *                   default: 60c72b2f9b1d8e1d88c3f7a2
 *                 name:
 *                   type: string
 *                   description: The name of the booking status
 *                   enum: ['SUBMITTED', 'REJECTED', 'APPROVED', 'CANCELED', 'IN_DELIVERY', 'COMPLETED']
 *                   default: SUBMITTED
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date when the booking status was created
 *                   default: 2023-05-31T09:32:31.488Z
 *       400:
 *         description: Bad request
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 *       404:
 *         description: The booking status was not found
 */
router.put('/:id', authorize('MANAGER'), updateBookingStatus);

/**
 * @swagger
 * /api/v1/booking-statuses/{id}:
 *   delete:
 *     summary: Remove the booking status by id
 *     tags: [BookingStatuses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1d8e1d88c3f7a2"
 *         required: true
 *         description: The booking status id
 *     responses:
 *       200:
 *         description: The booking status was deleted
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 *       404:
 *         description: The booking status was not found
 */
router.delete('/:id', authorize('MANAGER'), deleteBookingStatus);

module.exports = router;
