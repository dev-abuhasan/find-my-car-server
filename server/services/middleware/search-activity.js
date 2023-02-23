import Search from "../../models/search.model.js";
import asyncHandler from 'express-async-handler';
import Car from "../../models/car.models.js";

export const searchActivity = asyncHandler(async (req, res, next) => {
    if (req.baseUrl) {
        const car = await Car.findById(req.params.id);

        const search = new Search({
            ip: req.ip,
            type: req.baseUrl,
            data: req.query,
            params: car? req.params.id : null
        });
        await search.save();
        next();
    } else {
        res.status(401);
        throw new Error('Search Activity Not Added!');
    }
});