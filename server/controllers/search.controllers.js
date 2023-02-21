import asyncHandler from 'express-async-handler';
import Search from "../models/search.model.js";
import { responseUpdate } from '../services/utils/response-update.js';

export const getSearch = asyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Search.countDocuments({});
    const search = await Search.find({})
        .sort({ price: req.query.sortPrice === 'highToLow' ? -1 : 1 })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json(responseUpdate('User Search History SUCCESS!', 0, { count, page, pages: Math.ceil(count / pageSize), search }));
});

export const deleteByID = asyncHandler(async (req, res) => {
    const search = await Search.findById(req.params.id);
    if (search) {
        await search.remove();
        res.json(responseUpdate('History Deleted Successfully', 0, req.params.id));
    } else {
        res.status(404);
        throw new Error('History not found');
    }
});

export const deleteAll = async (req, res) => {
    try {
        const result = await Search.deleteMany({});
        res.json(responseUpdate(`${result.deletedCount} documents deleted successfully`, 0));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Multiple Delete Not SUCCESS!' });
    }
};