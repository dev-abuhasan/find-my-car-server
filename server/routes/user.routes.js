import express from 'express';
import {
    activeUserAccount, deleteUser, getUserById, getUserProfile, getUsers,
    login, register, updateUser, updateUserProfile
} from '../controllers/user.controllers.js';
import { admin, protect } from '../services/middleware/auth.js';

const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/activation', activeUserAccount);

router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.route('/admin').get(protect, admin, getUsers);
router
    .route('/admin/:id')
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);

export default router;
