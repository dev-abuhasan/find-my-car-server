import express from 'express';
import { createCar, deleteCar, getCars, updateCar, userCar } from '../controllers/car.controllers.js';

import { admin, protect } from '../services/middleware/auth.js';

const router = express.Router();

router.route('/').get(getCars);
router.route('/create').post(protect, createCar);

//own car list
router.route('/user-car').get(protect, userCar);

router
    .route('/user-car/:id')
    .put(protect, updateCar)
    .delete(protect, deleteCar);

//   .get(getProductById)
//   .post(protect, createProductReview)
//   .put(protect, admin, updateProduct)
//   .delete(protect, admin, deleteProduct);

export default router;