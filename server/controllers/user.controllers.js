import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { google } from 'googleapis';
import fetch from 'node-fetch';
import User from '../models/user.models.js';
import { createActivationToken, generateIdToken } from '../services/utils/generate-token.js';
import { sendActivationEmail } from '../services/utils/send-mail.js';
import { responseUpdate } from '../services/utils/response-update.js';


const { OAuth2 } = google.auth;
const client = new OAuth2(process.env.GOOGLE_CLIENT_ID);

// Register New User
export const register = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const activationToken = createActivationToken(req.body);
    const url = `${process.env.CLIENT_URI}/user/active/${activationToken}`;

    await sendActivationEmail(email, url);

    res.json({ message: `Account activation email has sent to ${email}` });
});
// User Activation
export const activeUserAccount = asyncHandler(async (req, res) => {
    const { token } = req.body;
    const decodeUser = await jwt.verify(token, process.env.JWT_SECRET);
    const { firstName, lastName, email, password } = decodeUser;

    // Check user if exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists!');
    }

    // Creating new user
    const user = await User.create({ firstName, lastName, email, password });

    if (user) {
        res.status(201).json(responseUpdate("User activation SUCCESS!", 0, {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateIdToken(user._id),
        }));
    } else {
        res.status(404);
        throw new Error('User not found!');
    }
});
// User Login
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ error: 'User Not Found!' });
    }

    if (user && (await user.matchPassword(password))) {
        user.loginAttempts = 0;
        await user.save();
        res.json(responseUpdate("User login SUCCESS!", 0, {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateIdToken(user._id),
        }));
    } else {
        user.loginAttempts += 1;
        user.lastLoginAttempt = new Date();
        await user.save();
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

//User self - Update
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json(responseUpdate("User profile SUCCESS!", 0, {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName || '',
            avatar: user.avatar,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateIdToken(user._id),
        }));
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.avatar = req.body.avatar || user.avatar;
        if (req.body.avatar) {
            user.avatar = req.body.avatar;
        }
        if (req.body.newPassword) {
            if (await user.matchPassword(req.body.oldPassword)) {
                user.password = req.body.newPassword;
            } else {
                res.status(400);
                throw new Error('Current password is incorrect!');
            }
        }

        const updateUser = await user.save();
        res.json(responseUpdate("User update SUCCESS!", 0, {
            _id: updateUser._id,
            firstName: updateUser.firstName,
            lastName: updateUser.lastName || '',
            avatar: updateUser.avatar,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateIdToken(updateUser._id),
        }));
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password');

    if (users) {
        res.json(responseUpdate("User profile SUCCESS!", 0, users));
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});
export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        res.json(responseUpdate("User By Id SUCCESS!", 0, {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName || '',
            avatar: user.avatar,
            email: user.email,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
            token: generateIdToken(user._id),
        }));
    } else {
        res.status(404);
        throw new Error('User not found!');
    }
});
export const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.avatar = req.body.avatar || user.avatar;
        user.isAdmin = req.body.isAdmin;

        if (req.body.avatar) {
            user.avatar = req.body.avatar;
        }

        const updateUser = await user.save();
        res.json(responseUpdate("User Update SUCCESS!", 0, {
            _id: updateUser._id,
            firstName: updateUser.firstName,
            lastName: updateUser?.lastName || '',
            avatar: updateUser.avatar,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        }));
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json(res.json(responseUpdate("User Delete SUCCESS!", 0,)));
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});
