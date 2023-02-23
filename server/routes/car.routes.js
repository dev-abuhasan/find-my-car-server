import express from 'express';
import { createCar, deleteCar, getCarById, getCars, offerCars, recommendCars, topCars, updateCar, userCar, userLikesMost } from '../controllers/car.controllers.js';

import { admin, protect } from '../services/middleware/auth.js';
import { searchActivity } from '../services/middleware/search-activity.js';

const router = express.Router();

router.route('/').get(searchActivity, getCars);
router.route('/create').post(protect, createCar);

router
    .route('/user-car/:id')
    .put(protect, updateCar)
    .delete(protect, deleteCar);

router.route('/user-car').get(protect, userCar);
router.route('/top-cars').get(topCars);
router.route('/offers-cars').get(offerCars);
router.route('/recommend-cars').get(recommendCars);
router.route('/user-most-like').get(userLikesMost);

router.route('/:id').get(searchActivity, getCarById);


export default router;