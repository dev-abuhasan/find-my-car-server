import fs from 'fs';
import asyncHandler from 'express-async-handler';
import { v2 as cloudinary } from 'cloudinary';
import { responseUpdate } from '../services/utils/response-update.js';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const removeTemp = path => {
    fs.unlink(path, err => {
        console.log(err);
    });
};

// Upload Avatar
export const uploadAvatar = asyncHandler(async (req, res) => {
    const file = req.files.avatar;

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: 'avatar',
    });

    if (result) {
        removeTemp(file.tempFilePath);
        res.json(responseUpdate("Avatar Upload SUCCESS!", 0, { url: result.secure_url }));
    } else {
        res.status(400);
        throw new Error('Something went wrong!');
    }
});

// Upload Car Image
export const uploadCar = asyncHandler(async (req, res) => {
    const file = req.files.car;

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: 'car',
    });

    if (result) {
        removeTemp(file.tempFilePath);
        res.json(responseUpdate("Car Upload SUCCESS!", 0, { url: result.secure_url }));
    } else {
        res.status(400);
        throw new Error('Something went wrong!');
    }
});