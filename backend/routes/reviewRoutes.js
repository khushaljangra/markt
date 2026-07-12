import express from 'express';
import {
  addReview,
  getProjectReviews,
  deleteReview,
} from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, addReview);
router.get('/project/:projectId', getProjectReviews);
router.delete('/:id', protect, deleteReview);

export default router;
