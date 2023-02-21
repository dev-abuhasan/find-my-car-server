import express from 'express';
import { GeneratedAPIs } from 'googleapis/build/src/apis/index.js';
import { getCars } from '../controllers/car.controllers.js';

import { admin, protect } from '../services/middleware/auth.js';

const router = express.Router();

router.route('/').get(getCars);

// router.route('/create').post(protect, admin, createProduct);
// router
//   .route('/:id')
//   .get(getProductById)
//   .post(protect, createProductReview)
//   .put(protect, admin, updateProduct)
//   .delete(protect, admin, deleteProduct);

export default router;