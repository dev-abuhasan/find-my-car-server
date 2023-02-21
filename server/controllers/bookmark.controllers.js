import asyncHandler from 'express-async-handler';
import Bookmark from '../models/bookmark.model.js';
import { responseUpdate } from '../services/utils/response-update.js';

export const getBookmarks = asyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;


    const count = await Bookmark.countDocuments({});
    const bookmarks = await Bookmark.find({})
        .sort({ price: req.query.sortPrice === 'highToLow' ? -1 : 1 })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json(responseUpdate('Bookmark List SUCCESS!', 0, { count, page, pages: Math.ceil(count / pageSize), bookmarks, }));
});


// Create Product
export const createBookmarks = asyncHandler(async (req, res) => {
    const {
        _id,
    } = req.body;

    const bookmark = new Bookmark({
        user: req.user._id,
        car: _id
    });

    const createdBookmark = await bookmark.save();

    res.status(201).json(responseUpdate('Car Create SUCCESS!', 0, createdBookmark));
});