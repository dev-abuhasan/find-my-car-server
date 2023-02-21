import express from 'express';
import { uploadAvatar, uploadCar } from '../controllers/upload.controllers.js';
import { protect } from '../services/middleware/auth.js';
import { uploader } from '../services/middleware/upload.js';

const router = express.Router();

router.route('/avatar').post(protect, uploader, uploadAvatar);
router.route('/car').post(protect, uploader, uploadCar);

export default router;
