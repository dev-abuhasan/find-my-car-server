import express from 'express';
import { uploadAvatar } from '../controllers/upload.controllers.js';
import { protect } from '../services/middleware/auth.js';
import { uploader } from '../services/middleware/upload.js';

const router = express.Router();

router.route('/avatar').post(protect, uploader, uploadAvatar);

export default router;
