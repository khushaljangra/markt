import express from 'express';
import {
  createFeatureRequest,
  getProjectFeatureRequests,
  upvoteFeatureRequest,
} from '../controllers/featureRequestController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createFeatureRequest);
router.get('/project/:projectId', getProjectFeatureRequests);
router.post('/:id/upvote', protect, upvoteFeatureRequest);

export default router;
