import express from 'express';
import {
  createComment,
  updateComment,
  deleteComment,
  getComments,
  verifiedComment
} from '../controllers/comments.controller.js';

const router = express.Router();

router.route('/')
  .get(getComments)
  .post(createComment);

/* identity is _id or slug */
router.route('/:id')
  .patch(updateComment)
  .delete(deleteComment);

router.patch('/:id/verified', verifiedComment);
export default router;