import express from 'express';
import { createCar, deleteCar, getCarById, getCars, offerCars, topCars, updateCar, userCar } from '../controllers/car.controllers.js';

import { admin, protect } from '../services/middleware/auth.js';

const router = express.Router();

router.route('/').get(getCars);
router.route('/create').post(protect, createCar);

router
    .route('/user-car/:id')
    .put(protect, updateCar)
    .delete(protect, deleteCar);

router.route('/user-car').get(protect, userCar);
router.route('/top-cars').get(protect, topCars);
router.route('/offers-cars').get(offerCars);

router.route('/:id').get(getCarById);


export default router;