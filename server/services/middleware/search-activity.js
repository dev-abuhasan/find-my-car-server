import Search from "../../models/search.model.js";
import asyncHandler from 'express-async-handler';

export const searchActivity = asyncHandler(async (req, res, next) => {
    if (req.baseUrl) {
        const search = new Search({
            ip: req.ip,
            type: req.baseUrl,
            data: req.query,
            params: req.params.id
        });
        await search.save();
        next();
    } else {
        res.status(401);
        throw new Error('Search Activity Not Added!');
    }
});