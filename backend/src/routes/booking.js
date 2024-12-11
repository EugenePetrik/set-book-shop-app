const express = require('express');
const {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require('../controllers/booking');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - product
 *         - user
 *         - delivery_address
 *         - date
 *         - time
 *         - status
 *         - quantity
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the booking
 *         product:
 *           type: object
 *           description: The associated product
 *           properties:
 *             id:
 *               type: string
 *               description: The product id
 *             name:
 *               type: string
 *               description: The name of the product
 *             slug:
 *               type: string
 *               description: The slug of the product
 *             description:
 *               type: string
 *               description: The description of the product
 *             author:
 *               type: string
 *               description: The author of the product
 *             price:
 *               type: number
 *               description: The price of the product
 *             image_path:
 *               type: string
 *               description: The image path of the product
 *         user:
 *           type: object
 *           description: The user who made the booking
 *           properties:
 *             id:
 *               type: string
 *               description: The user id
 *             name:
 *               type: string
 *               description: The name of the user
 *             email:
 *               type: string
 *               description: The email of the user
 *             role:
 *               type: string
 *               description: The role of the user
 *         delivery_address:
 *           type: string
 *           description: The delivery address for the booking
 *           minlength: 10
 *         date:
 *           type: string
 *           description: The date of the booking
 *         time:
 *           type: string
 *           description: The time of the booking
 *         status:
 *           type: object
 *           description: The status of the booking
 *           properties:
 *             id:
 *               type: string
 *               description: The status id
 *             name:
 *               type: string
 *               description: The name of the status
 *         quantity:
 *           type: number
 *           description: The quantity of products booked
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the booking was created
 *       example:
 *         id: 60d0fe4f5311236168a109cd
 *         product:
 *           id: 60d0fe4f5311236168a109cb
 *           name: Example Product
 *           slug: example-product
 *           description: This is an example product
 *           author: John Doe
 *           price: 29.99
 *           image_path: /images/example.jpg
 *         user:
 *           id: 60d0fe4f5311236168a109cc
 *           name: Jane Smith
 *           email: jane@example.com
 *           role: CUSTOMER
 *         delivery_address: 123 Main St, Anytown, USA
 *         date: 2024-05-01
 *         time: 14:00
 *         status:
 *           id: 60d0fe4f5311236168a109ce
 *           name: Pending
 *         quantity: 2
 *         createdAt: 2024-05-31T00:00:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: The bookings managing API
 */

/**
 * @swagger
 * /api/v1/bookings:
 *   get:
 *     summary: Returns the list of all the bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: The list of the bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - product
 *                   - user
 *                   - delivery_address
 *                   - date
 *                   - time
 *                   - status
 *                   - quantity
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The auto-generated id of the booking
 *                     default: 60d0fe4f5311236168a109cd
 *                   product:
 *                     type: object
 *                     description: The associated product
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The product id
 *                         default: 60d0fe4f5311236168a109cb
 *                       name:
 *                         type: string
 *                         description: The name of the product
 *                         default: Example Product
 *                       slug:
 *                         type: string
 *                         description: The slug of the product
 *                         default: example-product
 *                       description:
 *                         type: string
 *                         description: The description of the product
 *                         default: This is an example product
 *                       author:
 *                         type: string
 *                         description: The author of the product
 *                         default: John Doe
 *                       price:
 *                         type: number
 *                         description: The price of the product
 *                         default: 29.99
 *                       image_path:
 *                         type: string
 *                         description: The image path of the product
 *                         default: /images/example.jpg
 *                   user:
 *                     type: object
 *                     description: The user who made the booking
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The user id
 *                         default: 60d0fe4f5311236168a109cc
 *                       name:
 *                         type: string
 *                         description: The name of the user
 *                         default: Jane Smith
 *                       email:
 *                         type: string
 *                         description: The email of the user
 *                         default: jane@example.com
 *                       role:
 *                         type: string
 *                         description: The role of the user
 *                         default: CUSTOMER
 *                   delivery_address:
 *                     type: string
 *                     description: The delivery address for the booking
 *                     minlength: 10
 *                     default: 123 Main St, Anytown, USA
 *                   date:
 *                     type: string
 *                     description: The date of the booking
 *                     default: 2024-05-01
 *                   time:
 *                     type: string
 *                     description: The time of the booking
 *                     default: 14:00
 *                   status:
 *                     type: object
 *                     description: The status of the booking
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The status id
 *                         default: 60d0fe4f5311236168a109ce
 *                       name:
 *                         type: string
 *                         description: The name of the status
 *                         default: SUBMITTED
 *                   quantity:
 *                     type: number
 *                     description: The quantity of products booked
 *                     default: 2
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date when the booking was created
 *                     default: 2024-05-31T00:00:00.000Z
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 */
router.get('/', authorize('MANAGER', 'CUSTOMER'), getBookings);

/**
 * @swagger
 * /api/v1/bookings/{id}:
 *   get:
 *     summary: Get the booking by id
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 60c72b2f9b1d8e1d88c3f7a2
 *         required: true
 *         description: The booking id
 *     responses:
 *       200:
 *         description: The booking description by id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - product
 *                 - user
 *                 - delivery_address
 *                 - date
 *                 - time
 *                 - status
 *                 - quantity
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the booking
 *                   default: 60d0fe4f5311236168a109cd
 *                 product:
 *                   type: object
 *                   description: The associated product
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The product id
 *                       default: 60d0fe4f5311236168a109cb
 *                     name:
 *                       type: string
 *                       description: The name of the product
 *                       default: Example Product
 *                     slug:
 *                       type: string
 *                       description: The slug of the product
 *                       default: example-product
 *                     description:
 *                       type: string
 *                       description: The description of the product
 *                       default: This is an example product
 *                     author:
 *                       type: string
 *                       description: The author of the product
 *                       default: John Doe
 *                     price:
 *                       type: number
 *                       description: The price of the product
 *                       default: 29.99
 *                     image_path:
 *                       type: string
 *                       description: The image path of the product
 *                       default: /images/example.jpg
 *                 user:
 *                   type: object
 *                   description: The user who made the booking
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The user id
 *                       default: 60d0fe4f5311236168a109cc
 *                     name:
 *                       type: string
 *                       description: The name of the user
 *                       default: Jane Smith
 *                     email:
 *                       type: string
 *                       description: The email of the user
 *                       default: jane@example.com
 *                     role:
 *                       type: string
 *                       description: The role of the user
 *                       default: CUSTOMER
 *                 delivery_address:
 *                   type: string
 *                   description: The delivery address for the booking
 *                   minlength: 10
 *                   default: 123 Main St, Anytown, USA
 *                 date:
 *                   type: string
 *                   description: The date of the booking
 *                   default: 2024-05-01
 *                 time:
 *                   type: string
 *                   description: The time of the booking
 *                   default: 14:00
 *                 status:
 *                   type: object
 *                   description: The status of the booking
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The status id
 *                       default: 60d0fe4f5311236168a109ce
 *                     name:
 *                       type: string
 *                       description: The name of the status
 *                       default: SUBMITTED
 *                 quantity:
 *                   type: number
 *                   description: The quantity of products booked
 *                   default: 2
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date when the booking was created
 *                   default: 2024-05-31T00:00:00.000Z
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 *       404:
 *         description: The booking was not found
 */
router.get('/:id', authorize('MANAGER', 'CUSTOMER'), getBookingById);

/**
 * @swagger
 * /api/v1/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - user
 *               - delivery_address
 *               - date
 *               - time
 *               - status
 *               - quantity
 *             properties:
 *               product:
 *                 type: string
 *                 description: The product id
 *                 default: 60d0fe4f5311236168a109cb
 *               user:
 *                 type: string
 *                 description: The user id
 *                 default: 60d0fe4f5311236168a109cc
 *               delivery_address:
 *                 type: string
 *                 description: The delivery address for the booking
 *                 minlength: 10
 *                 default: 123 Main St, Anytown, USA
 *               date:
 *                 type: string
 *                 description: The date of the booking
 *                 default: 2024-05-01
 *               time:
 *                 type: string
 *                 description: The time of the booking
 *                 default: 14:00
 *               status:
 *                 type: string
 *                 description: The status id
 *                 default: 60d0fe4f5311236168a109ce
 *               quantity:
 *                 type: number
 *                 description: The quantity of products booked
 *                 default: 2
 *     responses:
 *       201:
 *         description: The booking was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - product
 *                 - user
 *                 - delivery_address
 *                 - date
 *                 - time
 *                 - status
 *                 - quantity
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the booking
 *                   default: 60d0fe4f5311236168a109cd
 *                 product:
 *                   type: object
 *                   description: The associated product
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The product id
 *                       default: 60d0fe4f5311236168a109cb
 *                     name:
 *                       type: string
 *                       description: The name of the product
 *                       default: Example Product
 *                     slug:
 *                       type: string
 *                       description: The slug of the product
 *                       default: example-product
 *                     description:
 *                       type: string
 *                       description: The description of the product
 *                       default: This is an example product
 *                     author:
 *                       type: string
 *                       description: The author of the product
 *                       default: John Doe
 *                     price:
 *                       type: number
 *                       description: The price of the product
 *                       default: 29.99
 *                     image_path:
 *                       type: string
 *                       description: The image path of the product
 *                       default: /images/example.jpg
 *                 user:
 *                   type: object
 *                   description: The user who made the booking
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The user id
 *                       default: 60d0fe4f5311236168a109cc
 *                     name:
 *                       type: string
 *                       description: The name of the user
 *                       default: Jane Smith
 *                     email:
 *                       type: string
 *                       description: The email of the user
 *                       default: jane@example.com
 *                     role:
 *                       type: string
 *                       description: The role of the user
 *                       default: CUSTOMER
 *                 delivery_address:
 *                   type: string
 *                   description: The delivery address for the booking
 *                   minlength: 10
 *                   default: 123 Main St, Anytown, USA
 *                 date:
 *                   type: string
 *                   description: The date of the booking
 *                   default: 2024-05-01
 *                 time:
 *                   type: string
 *                   description: The time of the booking
 *                   default: 14:00
 *                 status:
 *                   type: object
 *                   description: The status of the booking
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The status id
 *                       default: 60d0fe4f5311236168a109ce
 *                     name:
 *                       type: string
 *                       description: The name of the status
 *                       default: SUBMITTED
 *                 quantity:
 *                   type: number
 *                   description: The quantity of products booked
 *                   default: 2
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date when the booking was created
 *                   default: 2024-05-31T00:00:00.000Z
 *       400:
 *         description: Bad request
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 */
router.post('/', authorize('MANAGER', 'CUSTOMER'), createBooking);

/**
 * @swagger
 * /api/v1/bookings/{id}:
 *   put:
 *     summary: Update the booking by the id
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 60c72b2f9b1d8e1d88c3f7a2
 *         required: true
 *         description: The booking id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - user
 *               - delivery_address
 *               - date
 *               - time
 *               - status
 *               - quantity
 *             properties:
 *               product:
 *                 type: string
 *                 description: The product id
 *                 default: 60d0fe4f5311236168a109cb
 *               user:
 *                 type: string
 *                 description: The user id
 *                 default: 60d0fe4f5311236168a109cc
 *               delivery_address:
 *                 type: string
 *                 description: The delivery address for the booking
 *                 minlength: 10
 *                 default: 123 Main St, Anytown, USA
 *               date:
 *                 type: string
 *                 description: The date of the booking
 *                 default: 2024-05-01
 *               time:
 *                 type: string
 *                 description: The time of the booking
 *                 default: 14:00
 *               status:
 *                 type: object
 *                 description: The status id
 *                 default: 60d0fe4f5311236168a109ce
 *               quantity:
 *                 type: number
 *                 description: The quantity of products booked
 *                 default: 2
 *     responses:
 *       200:
 *         description: The booking was updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - product
 *                 - user
 *                 - delivery_address
 *                 - date
 *                 - time
 *                 - status
 *                 - quantity
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the booking
 *                   default: 60d0fe4f5311236168a109cd
 *                 product:
 *                   type: object
 *                   description: The associated product
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The product id
 *                       default: 60d0fe4f5311236168a109cb
 *                     name:
 *                       type: string
 *                       description: The name of the product
 *                       default: Example Product
 *                     slug:
 *                       type: string
 *                       description: The slug of the product
 *                       default: example-product
 *                     description:
 *                       type: string
 *                       description: The description of the product
 *                       default: This is an example product
 *                     author:
 *                       type: string
 *                       description: The author of the product
 *                       default: John Doe
 *                     price:
 *                       type: number
 *                       description: The price of the product
 *                       default: 29.99
 *                     image_path:
 *                       type: string
 *                       description: The image path of the product
 *                       default: /images/example.jpg
 *                 user:
 *                   type: object
 *                   description: The user who made the booking
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The user id
 *                       default: 60d0fe4f5311236168a109cc
 *                     name:
 *                       type: string
 *                       description: The name of the user
 *                       default: Jane Smith
 *                     email:
 *                       type: string
 *                       description: The email of the user
 *                       default: jane@example.com
 *                     role:
 *                       type: string
 *                       description: The role of the user
 *                       default: CUSTOMER
 *                 delivery_address:
 *                   type: string
 *                   description: The delivery address for the booking
 *                   minlength: 10
 *                   default: 123 Main St, Anytown, USA
 *                 date:
 *                   type: string
 *                   description: The date of the booking
 *                   default: 2024-05-01
 *                 time:
 *                   type: string
 *                   description: The time of the booking
 *                   default: 14:00
 *                 status:
 *                   type: object
 *                   description: The status of the booking
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The status id
 *                       default: 60d0fe4f5311236168a109ce
 *                     name:
 *                       type: string
 *                       description: The name of the status
 *                       default: SUBMITTED
 *                 quantity:
 *                   type: number
 *                   description: The quantity of products booked
 *                   default: 2
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date when the booking was created
 *                   default: 2024-05-31T00:00:00.000Z
 *       400:
 *         description: Bad request
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 *       404:
 *         description: The booking was not found
 */
router.put('/:id', authorize('MANAGER', 'CUSTOMER'), updateBooking);

/**
 * @swagger
 * /api/v1/bookings/{id}:
 *   delete:
 *     summary: Remove the booking by id
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 60c72b2f9b1d8e1d88c3f7a2
 *         required: true
 *         description: The booking id
 *     responses:
 *       200:
 *         description: The booking was deleted
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 *       404:
 *         description: The booking was not found
 */
router.delete('/:id', authorize('MANAGER', 'CUSTOMER'), deleteBooking);

module.exports = router;
