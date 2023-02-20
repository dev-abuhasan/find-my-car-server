import { responseError } from "../utils/response-update.js";

export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json(responseError(
        err.message,
        process.env.NODE_ENV === 'production' ? null : err.stack,
        1
    ));
};