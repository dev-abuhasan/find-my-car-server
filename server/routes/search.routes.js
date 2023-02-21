import express from 'express';
import { getSearch, deleteByID, deleteAll } from '../controllers/search.controllers.js';

const router = express.Router();

router.route('/').get(getSearch);
router.route('/delete').delete(deleteAll);
router.route('/:id').delete(deleteByID);

export default router;