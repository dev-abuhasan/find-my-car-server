import express from 'express';
import { createBookmarks, getBookmarks } from '../controllers/bookmark.controllers.js';
import { admin, protect } from '../services/middleware/auth.js';

const router = express.Router();

router.route('/').get(protect, getBookmarks);
router.route('/create').post(protect, createBookmarks);

export default router;