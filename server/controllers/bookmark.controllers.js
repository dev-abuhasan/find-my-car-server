import asyncHandler from 'express-async-handler';
import Bookmark from '../models/bookmark.model.js';
import Car from '../models/car.models.js';
import { responseUpdate } from '../services/utils/response-update.js';

export const getBookmarks = asyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Bookmark.countDocuments({ user: req.user._id });
    const bookmark = await Bookmark.find({ user: req.user._id })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json(responseUpdate('Bookmark List SUCCESS!', 0, { count, page, pages: Math.ceil(count / pageSize), bookmark, }));
});

// Create Bookmark
export const createBookmarks = asyncHandler(async (req, res) => {

    const car = await Car.findById(req.params.id);
    if (!car) {
        res.status(404);
        throw new Error('Car not found');
    }

    const bookmarkExists = await Bookmark.findOne({ user: req.user._id, car: req.params.id });
    if (bookmarkExists) {
        res.status(400);
        throw new Error('Car already bookmarked by this user');
    };

    const bookmark = new Bookmark({
        user: req.user._id,
        car: req.params.id
    });

    const createdBookmark = await bookmark.save();

    res.status(201).json(responseUpdate('Car Bookmark SUCCESS!', 0, createdBookmark));
});

// Delete
export const deleteBookmark = asyncHandler(async (req, res) => {

    const bookmark = await Bookmark.findById(req.params.id);

    if (bookmark) {
        if (bookmark.user.toString() === req.user._id.toString()) {
            await bookmark.remove();
            res.json(responseUpdate('Bookmark Deleted Successfully', 0, req.params.id));
        } else {
            res.status(401);
            throw new Error('Not authorized to delete this Bookmark!');
        }
    } else {
        res.status(404);
        throw new Error('Bookmark not found');
    }
});