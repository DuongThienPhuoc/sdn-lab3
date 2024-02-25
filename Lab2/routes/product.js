import express from 'express';
import {ProductController} from '../controllers/index.js';

const productRouter = express.Router();

// GET: /products -> Get all products
productRouter.get('/', ProductController.getProducts);

// GET: /products/:id -> Get product by Id
productRouter.get('/:id', ProductController.getProductById);

// POST: /products -> Create a new product
productRouter.post('/', ProductController.createImage, ProductController.createComment, ProductController.createProduct);

// PUT: /products/:id
productRouter.put("/:id", ProductController.editProduct);

// PATCH: /products/:id
productRouter.patch("/:id",ProductController.createComment,ProductController.editProduct);

// DELETE: /products/:id
productRouter.delete("/:id", ProductController.deleteProduct);

export default productRouter;