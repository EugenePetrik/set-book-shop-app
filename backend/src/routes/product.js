const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/product');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - author
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *           minlength: 10
 *           maxlength: 50
 *         description:
 *           type: string
 *           description: The description of the product
 *           minlength: 10
 *           maxlength: 500
 *         slug:
 *           type: string
 *           description: The slug generated from the product name
 *         author:
 *           type: string
 *           description: The author of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         image_path:
 *           type: string
 *           description: The path to the product image
 *           default: https://file-examples.com/storage/fe4e1227086659fa1a24064/2017/10/file_example_JPG_100kB.jpg
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the product was created
 *           default: Date.now
 *       example:
 *         id: 60d0fe4f5311236168a109ca
 *         name: Example Product
 *         slug: example-product
 *         description: This is an example product.
 *         author: John Doe
 *         price: 29.99
 *         image_path: https://file-examples.com/storage/fe4e1227086659fa1a24064/2017/10/file_example_JPG_100kB.jpg
 *         createdAt: 2023-01-01T00:00:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The products managing API
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Returns the list of all the products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - id
 *                   - name
 *                   - description
 *                   - author
 *                   - price
 *                   - image_path
 *                   - slug
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The auto-generated id of the product
 *                     default: 60d0fe4f5311236168a109ca
 *                   name:
 *                     type: string
 *                     description: The name of the product
 *                     minlength: 10
 *                     maxlength: 50
 *                     default: Example Product
 *                   description:
 *                     type: string
 *                     description: The description of the product
 *                     minlength: 10
 *                     maxlength: 500
 *                     default: This is an example product.
 *                   slug:
 *                     type: string
 *                     description: The slug generated from the product name
 *                     default: example-product
 *                   author:
 *                     type: string
 *                     description: The author of the product
 *                     default: John Doe
 *                   price:
 *                     type: number
 *                     description: The price of the product
 *                     default: 29.99
 *                   image_path:
 *                     type: string
 *                     description: The path to the product image
 *                     default: https://file-examples.com/storage/fe4e1227086659fa1a24064/2017/10/file_example_JPG_100kB.jpg
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date when the product was created
 *                     default: 2023-01-01T00:00:00.000Z
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 */
router.get('/', authorize('ADMIN', 'MANAGER', 'CUSTOMER'), getProducts);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 60c72b2f9b1d8e1d88c3f7a2
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product description by id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - name
 *                 - description
 *                 - author
 *                 - price
 *                 - image_path
 *                 - slug
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the product
 *                   default: 60d0fe4f5311236168a109ca
 *                 name:
 *                   type: string
 *                   description: The name of the product
 *                   minlength: 10
 *                   maxlength: 50
 *                   default: Example Product
 *                 description:
 *                   type: string
 *                   description: The description of the product
 *                   minlength: 10
 *                   maxlength: 500
 *                   default: This is an example product.
 *                 slug:
 *                   type: string
 *                   description: The slug generated from the product name
 *                   default: example-product
 *                 author:
 *                   type: string
 *                   description: The author of the product
 *                   default: John Doe
 *                 price:
 *                   type: number
 *                   description: The price of the product
 *                   default: 29.99
 *                 image_path:
 *                   type: string
 *                   description: The path to the product image
 *                   default: https://file-examples.com/storage/fe4e1227086659fa1a24064/2017/10/file_example_JPG_100kB.jpg
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date when the product was created
 *                   default: 2023-01-01T00:00:00.000Z
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 *       404:
 *         description: The product was not found
 */
router.get('/:id', authorize('ADMIN', 'MANAGER', 'CUSTOMER'), getProductById);

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
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
 *               - description
 *               - author
 *               - price
 *               - image_path
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *                 minlength: 10
 *                 maxlength: 50
 *                 default: Example Product
 *               description:
 *                 type: string
 *                 description: The description of the product
 *                 minlength: 10
 *                 maxlength: 500
 *                 default: This is an example product.
 *               author:
 *                 type: string
 *                 description: The author of the product
 *                 default: John Doe
 *               price:
 *                 type: number
 *                 description: The price of the product
 *                 default: 29.99
 *               image_path:
 *                 type: string
 *                 description: The path to the product image
 *                 default: https://file-examples.com/storage/fe4e1227086659fa1a24064/2017/10/file_example_JPG_100kB.jpg
 *     responses:
 *       201:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - name
 *                 - description
 *                 - author
 *                 - price
 *                 - slug
 *                 - image_path
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the product
 *                   default: 60d0fe4f5311236168a109ca
 *                 name:
 *                   type: string
 *                   description: The name of the product
 *                   minlength: 10
 *                   maxlength: 50
 *                   default: Example Product
 *                 description:
 *                   type: string
 *                   description: The description of the product
 *                   minlength: 10
 *                   maxlength: 500
 *                   default: This is an example product.
 *                 slug:
 *                   type: string
 *                   description: The slug generated from the product name
 *                   default: example-product
 *                 author:
 *                   type: string
 *                   description: The author of the product
 *                   default: John Doe
 *                 price:
 *                   type: number
 *                   description: The price of the product
 *                   default: 29.99
 *                 image_path:
 *                   type: string
 *                   description: The path to the product image
 *                   default: https://file-examples.com/storage/fe4e1227086659fa1a24064/2017/10/file_example_JPG_100kB.jpg
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date when the product was created
 *                   default: 2023-01-01T00:00:00.000Z
 *       400:
 *         description: Bad request
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 */
router.post('/', authorize('MANAGER'), createProduct);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update the product by the id
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 60c72b2f9b1d8e1d88c3f7a2
 *         required: true
 *         description: The product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - author
 *               - price
 *               - image_path
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *                 minlength: 10
 *                 maxlength: 50
 *                 default: Example Product
 *               description:
 *                 type: string
 *                 description: The description of the product
 *                 minlength: 10
 *                 maxlength: 500
 *                 default: This is an example product.
 *               author:
 *                 type: string
 *                 description: The author of the product
 *                 default: John Doe
 *               price:
 *                 type: number
 *                 description: The price of the product
 *                 default: 29.99
 *               image_path:
 *                 type: string
 *                 description: The path to the product image
 *                 default: https://file-examples.com/storage/fe4e1227086659fa1a24064/2017/10/file_example_JPG_100kB.jpg
 *     responses:
 *       200:
 *         description: The product was updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - name
 *                 - description
 *                 - author
 *                 - price
 *                 - slug
 *                 - image_path
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The auto-generated id of the product
 *                   default: 60d0fe4f5311236168a109ca
 *                 name:
 *                   type: string
 *                   description: The name of the product
 *                   minlength: 10
 *                   maxlength: 50
 *                   default: Example Product
 *                 description:
 *                   type: string
 *                   description: The description of the product
 *                   minlength: 10
 *                   maxlength: 500
 *                   default: This is an example product.
 *                 slug:
 *                   type: string
 *                   description: The slug generated from the product name
 *                   default: example-product
 *                 author:
 *                   type: string
 *                   description: The author of the product
 *                   default: John Doe
 *                 price:
 *                   type: number
 *                   description: The price of the product
 *                   default: 29.99
 *                 image_path:
 *                   type: string
 *                   description: The path to the product image
 *                   default: https://file-examples.com/storage/fe4e1227086659fa1a24064/2017/10/file_example_JPG_100kB.jpg
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date when the product was created
 *                   default: 2023-01-01T00:00:00.000Z
 *       400:
 *         description: Bad request
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 *       404:
 *         description: The product was not found
 */
router.put('/:id', authorize('MANAGER'), updateProduct);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Remove the product by id
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 60c72b2f9b1d8e1d88c3f7a2
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product was deleted
 *       401:
 *         description: Not authorized to access this route
 *       403:
 *         description: User role is not authorized to access this route
 *       404:
 *         description: The product was not found
 */
router.delete('/:id', authorize('MANAGER'), deleteProduct);

module.exports = router;
