import express from 'express';
import { createBookmarks, deleteBookmark, getBookmarks } from '../controllers/bookmark.controllers.js';
import { protect } from '../services/middleware/auth.js';

const router = express.Router();

router.route('/').get(protect, getBookmarks);
router.route('/create/:id').post(protect, createBookmarks);
router.route('/delete/:id').delete(protect, deleteBookmark);
export default router;