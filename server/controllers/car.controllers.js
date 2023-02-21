import asyncHandler from 'express-async-handler';
import Car from '../models/car.models.js';
import { responseUpdate } from '../services/utils/response-update.js';

// Get All Products
export const getCars = asyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};

    const count = await Car.countDocuments({ ...keyword });
    const cars = await Car.find({ ...keyword })
        .sort([['_id', 'desc']])
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json(responseUpdate('Car List SUCCESS!', 0, { page, pages: Math.ceil(count / pageSize), cars, }));
});