import asyncHandler from 'express-async-handler';
import Bookmark from '../models/bookmark.model.js';
import Car from '../models/car.models.js';
import User from '../models/user.models.js';
import { responseUpdate } from '../services/utils/response-update.js';
import { sendCarCreateEmail, sendCarDeleteEmail, sendCarUpdateEmail, sendCarUpdateNotification } from '../services/utils/send-mail.js';


// Get All Car
export const getCars = asyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
            $or: [
                { brand: { $regex: req.query.keyword, $options: 'i' } },
                { model: { $regex: req.query.keyword, $options: 'i' } },
                { year: { $regex: req.query.keyword, $options: 'i' } },
                { category: { $in: [req.query.keyword] } },
            ],
        }
        : {};

    const filters = {};
    if (req.query.seats) {
        filters.seats = {
            $gte: req.query.seats
            // $lte: 6
        };
    }
    if (req.query.price) {
        filters.price = { $lte: req.query.price };
    }
    if (req.query.startDate && req.query.endDate) {
        filters.createdAt = {
            $gte: new Date(req.query.startDate),
            $lte: new Date(req.query.endDate),
        };
    }

    const count = await Car.countDocuments({ ...keyword, ...filters });
    const cars = await Car.find({ ...keyword, ...filters })
        .sort({ price: req.query.sortPrice === 'highToLow' ? -1 : 1 })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json(responseUpdate('Car List SUCCESS!', 0, { count, page, pages: Math.ceil(count / pageSize), cars }));
});


// Get By ID
export const getCarById = asyncHandler(async (req, res) => {
    const car = await Car.findById(req.params.id);
    if (!car) {
        res.status(404);
        throw new Error('Car not found');
    }
    await Car.updateOne({ _id: req.params.id }, { $inc: { viewCount: 1 } });

    const updatedCar = await Car.findById(req.params.id);
    if (!updatedCar) {
        throw new Error('Error updating view count');
    }
    res.json(responseUpdate('Car By ID SUCCESS!', 0, updatedCar));
});


// Create Car
export const createCar = asyncHandler(async (req, res) => {

    const {
        brand,
        model,
        year,
        color,
        image,
        availableColors,
        categories,
        seats,
        price,
        location,
        countInStock,
        offer
    } = req.body;

    const car = new Car({
        user: req.user._id,
        brand,
        model,
        year,
        color,
        image,
        availableColors,
        categories,
        seats,
        price,
        location,
        countInStock,
        offer
    });

    const createdCar = await car.save();
    if (createdCar) {
        await sendCarCreateEmail(req.user.email, createdCar);
    }

    res.status(201).json(responseUpdate('Car Create SUCCESS!', 0, createdCar));
});


//User own car list
export const userCar = asyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Car.countDocuments({ user: req.user._id });
    const cars = await Car.find({ user: req.user._id })
        .sort({ price: req.query.sortPrice === 'highToLow' ? -1 : 1 })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json(responseUpdate('Car List SUCCESS!', 0, { count, page, pages: Math.ceil(count / pageSize), cars, }));
});


//Top Car car list
export const topCars = asyncHandler(async (req, res) => {
    const topCars = await Car.find({})
        .sort({ price: req.query.sortPrice === 'highToLow' ? -1 : 1 });

    res.json(responseUpdate('Top Cars List SUCCESS!', 0, topCars));
});

//Offer Car car list
export const offerCars = asyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Car.countDocuments({ "offer.value": { $ne: 0 }, "offer.offerPrice": { $ne: 0 } });

    const offerCars = await Car.find({ "offer.value": { $ne: 0 }, "offer.offerPrice": { $ne: 0 } })
        .limit(pageSize)
        .skip(pageSize * (page - 1));


    res.json(responseUpdate('Offers Cars List SUCCESS!', 0, { count, page, pages: Math.ceil(count / pageSize), offerCars, }));
});


// Update Car
export const updateCar = asyncHandler(async (req, res) => {
    const {
        brand,
        model,
        year,
        color,
        image,
        availableColors,
        categories,
        seats,
        price,
        location,
        countInStock,
        offer
    } = req.body;

    const car = await Car.findById(req.params.id);
    const oldName = car.brand;
    if (car) {
        if (car.user.toString() === req.user._id.toString()) {
            car.brand = brand;
            car.model = model;
            car.year = year;
            car.color = color;
            car.image = image;
            car.availableColors = availableColors;
            car.categories = categories;
            car.seats = seats;
            car.price = price;
            car.location = location;
            car.countInStock = countInStock;
            car.offer = offer;

            const updatedCar = await car.save();

            if (updatedCar) {
                await sendCarUpdateEmail(req.user.email, updatedCar);

                const bookmarks = await Bookmark.find({ car: updatedCar._id });
                const users = bookmarks.map((bookmark) => bookmark.user.toString());
                const uniqueUsers = [...new Set(users)];
                const getUser = await User.find({ _id: { $in: uniqueUsers } });
                for (const { email } of getUser) {
                    await sendCarUpdateNotification(email, updatedCar, oldName);
                }

            }
            res.json(responseUpdate('Car Update Success!', 0, updatedCar));
        } else {
            res.status(401);
            throw new Error('Not authorized to update this car!');
        }
    } else {
        res.status(404);
        throw new Error('Car not found');
    }
});

// Delete Car
export const deleteCar = asyncHandler(async (req, res) => {

    const car = await Car.findById(req.params.id);

    if (car) {
        if (car.user.toString() === req.user._id.toString()) {
            await car.remove();
            await sendCarDeleteEmail(req.user.email, req.params.id);

            res.json(responseUpdate('Car Deleted Successfully', 0, req.params.id));
        } else {
            res.status(401);
            throw new Error('Not authorized to delete this car!');
        }
    } else {
        res.status(404);
        throw new Error('Car not found');
    }
});

