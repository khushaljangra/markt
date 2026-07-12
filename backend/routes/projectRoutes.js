import express from 'express';
import multer from 'multer';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addProjectVersion,
  getDownloadLink,
  downloadProjectSecure,
} from '../controllers/projectController.js';
import { protect, admin } from '../middleware/auth.js';

// Setup multer for memory storage uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // Limit file size to 100MB
  },
});

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/download-secure', downloadProjectSecure);
router.get('/:id', getProjectById);

// Admin-only creation/update/deletion routes
router.post('/', protect, admin, upload.single('file'), createProject);
router.put('/:id', protect, admin, upload.single('file'), updateProject);
router.delete('/:id', protect, admin, deleteProject);
router.post('/:id/versions', protect, admin, upload.single('file'), addProjectVersion);

// Protected user routes
router.get('/:id/download-link', protect, getDownloadLink);

export default router;
