const express = require('express');
const {
  createStoreItem,
  getStoreItems,
  getStoreItemById,
  updateStoreItem,
  deleteStoreItem,
} = require('../controllers/storeItem');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * components:
 *   schemas:
 *     StoreItem:
 *       type: object
 *       required:
 *         - product
 *         - available_qty
 *         - booked_qty
 *         - sold_qty
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the store item
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
 *             author:
 *               type: string
 *               description: The author of the product
 *             price:
 *               type: number
 *               description: The price of the product
 *         available_qty:
 *           type: number
 *           description: Available quantity of the product
 *         booked_qty:
 *           type: number
 *           description: Booked quantity of the product
 *         sold_qty:
 *           type: number
 *           description: Sold quantity of the product
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the store item was created
 *       example:
 *         id: 60d0fe4f5311236168a109ca
 *         product:
 *           id: 60d0fe4f5311236168a109cb
 *           name: Example Product
 *           author: John Doe
 *           price: 29.99
 *         available_qty: 10
 *         booked_qty: 5
 *         sold_qty: 3
 *         createdAt: 2023-01-01T00:00:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: StoreItems
 *   description: The store items managing API
 */

/**
 * @swagger
 * /api/v1/store-items:
 *   get:
 *     summary: Get all store items
 *     tags: [StoreItems]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of store items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - id
 *                   - product
 *                   - available_qty
 *                   - booked_qty
 *                   - sold_qty
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The auto-generated id of the store item
 *                     default: 60d0fe4f5311236168a109ca
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
 *                       author:
 *                         type: string
 *                         description: The author of the product
 *                         default: John Doe
 *                       price:
 *                         type: number
 *                         description: The price of the product
 *                         default: 29.99
 *                   available_qty:
 *                     type: number
 *                     description: Available quantity of the product
 *                     default: 10
 *                   booked_qty:
 *                     type: number
 *                     description: Booked quantity of the product
 *                     default: 5
 *                   sold_qty:
 *                     type: number
 *                     description: Sold quantity of the product
 *                     default: 3
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date the store item was created
 *                     default: 2023-01-01T00:00:00.000Z
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 */
router.get('/', authorize('MANAGER'), getStoreItems);

/**
 * @swagger
 * /api/v1/store-items/{id}:
 *   get:
 *     summary: Get the store item by id
 *     tags: [StoreItems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 60c72b2f9b1d8e1d88c3f7a2
 *         required: true
 *         description: The store item id
 *     responses:
 *       200:
 *         description: The store item description by id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - product
 *                 - available_qty
 *                 - booked_qty
 *                 - sold_qty
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the store item
 *                   default: 60d0fe4f5311236168a109ca
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
 *                     author:
 *                       type: string
 *                       description: The author of the product
 *                       default: John Doe
 *                     price:
 *                       type: number
 *                       description: The price of the product
 *                       default: 29.99
 *                 available_qty:
 *                   type: number
 *                   description: Available quantity of the product
 *                   default: 10
 *                 booked_qty:
 *                   type: number
 *                   description: Booked quantity of the product
 *                   default: 5
 *                 sold_qty:
 *                   type: number
 *                   description: Sold quantity of the product
 *                   default: 3
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the store item was created
 *                   default: 2023-01-01T00:00:00.000Z
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 *       404:
 *         description: The store item was not found
 */
router.get('/:id', authorize('MANAGER'), getStoreItemById);

/**
 * @swagger
 * /api/v1/store-items:
 *   post:
 *     summary: Create a new store item
 *     tags: [StoreItems]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - available_qty
 *               - booked_qty
 *               - sold_qty
 *             properties:
 *               product:
 *                 type: string
 *                 description: The product id
 *                 default: 60d0fe4f5311236168a109cb
 *               available_qty:
 *                 type: number
 *                 description: Available quantity of the product
 *                 default: 10
 *               booked_qty:
 *                 type: number
 *                 description: Booked quantity of the product
 *                 default: 5
 *               sold_qty:
 *                 type: number
 *                 description: Sold quantity of the product
 *                 default: 3
 *     responses:
 *       201:
 *         description: The store item was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - product
 *                 - available_qty
 *                 - booked_qty
 *                 - sold_qty
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the store item
 *                   default: 60d0fe4f5311236168a109ca
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
 *                     author:
 *                       type: string
 *                       description: The author of the product
 *                       default: John Doe
 *                     price:
 *                       type: number
 *                       description: The price of the product
 *                       default: 29.99
 *                 available_qty:
 *                   type: number
 *                   description: Available quantity of the product
 *                   default: 10
 *                 booked_qty:
 *                   type: number
 *                   description: Booked quantity of the product
 *                   default: 5
 *                 sold_qty:
 *                   type: number
 *                   description: Sold quantity of the product
 *                   default: 3
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the store item was created
 *                   default: 2023-01-01T00:00:00.000Z
 *       400:
 *         description: Bad request
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 */
router.post('/', authorize('MANAGER'), createStoreItem);

/**
 * @swagger
 * /api/v1/store-items/{id}:
 *   put:
 *     summary: Update the store item by id
 *     tags: [StoreItems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 60c72b2f9b1d8e1d88c3f7a2
 *         required: true
 *         description: The store item id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - available_qty
 *               - booked_qty
 *               - sold_qty
 *             properties:
 *               product:
 *                 type: string
 *                 description: The product id
 *                 default: 60d0fe4f5311236168a109cb
 *               available_qty:
 *                 type: number
 *                 description: Available quantity of the product
 *                 default: 10
 *               booked_qty:
 *                 type: number
 *                 description: Booked quantity of the product
 *                 default: 5
 *               sold_qty:
 *                 type: number
 *                 description: Sold quantity of the product
 *                 default: 3
 *     responses:
 *       200:
 *         description: The store item was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - product
 *                 - available_qty
 *                 - booked_qty
 *                 - sold_qty
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the store item
 *                   default: 60d0fe4f5311236168a109ca
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
 *                     author:
 *                       type: string
 *                       description: The author of the product
 *                       default: John Doe
 *                     price:
 *                       type: number
 *                       description: The price of the product
 *                       default: 29.99
 *                 available_qty:
 *                   type: number
 *                   description: Available quantity of the product
 *                   default: 10
 *                 booked_qty:
 *                   type: number
 *                   description: Booked quantity of the product
 *                   default: 5
 *                 sold_qty:
 *                   type: number
 *                   description: Sold quantity of the product
 *                   default: 3
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the store item was created
 *                   default: 2023-01-01T00:00:00.000Z
 *       400:
 *         description: Bad request
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 *       404:
 *         description: The store item was not found
 */
router.put('/:id', authorize('MANAGER'), updateStoreItem);

/**
 * @swagger
 * /api/v1/store-items/{id}:
 *   delete:
 *     summary: Delete the store item by id
 *     tags: [StoreItems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1d8e1d88c3f7a2"
 *         required: true
 *         description: The store item id
 *     responses:
 *       200:
 *         description: The store item was successfully deleted
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 *       404:
 *         description: The store item was not found
 */
router.delete('/:id', authorize('MANAGER'), deleteStoreItem);

module.exports = router;
