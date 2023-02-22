import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../../models/user.models.js';
import { responseUpdate } from '../utils/response-update.js';

//Login attempts
export const checkLoginAttempts = asyncHandler(async (req, res, next) => {
    const failedLoginAttempts = 3;
    const banTime = 15 * 60 * 1000;
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && user.loginAttempts >= failedLoginAttempts) {
            const banEndTime = new Date(user.lastLoginAttempt.getTime() + banTime);
            const now = new Date();

            if (now < banEndTime) {
                const remainingTime = Math.ceil((banEndTime - now) / 1000);
                const remainingMinutes = Math.floor(remainingTime / 60);
                const remainingSeconds = remainingTime % 60;

                return res.status(429).json(responseUpdate('Many Login attempts!', 1, {
                    error: `Too many failed login attempts. Please try again in ${remainingMinutes}:${remainingSeconds} min.`,
                }));
            }

            // If the ban time has elapsed, reset the login attempts
            user.loginAttempts = 0;
        }

        next();
    } catch (err) {
        res.status(500);
        throw new Error('Server error!');
    }

});

// Protect Route
export const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.decode(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (err) {
            res.status(401);
            throw new Error('Not Authorized, Token Failed!');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not Authorized, No Token!');
    }
});

// Admin Route
export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not Authorized As An Admin!');
    }
};
