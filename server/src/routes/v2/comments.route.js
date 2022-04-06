import { Router } from 'express';
import {
  createComment, deleteComment,
  getComments, updateComment, verifiedComment
} from '../../controllers/comments.controller.js';

const router = Router();

/**
 * No authorization
 */

router.route('/')
  .get(getComments)
  .post(createComment);

router.route('/:product')
  .get(getComments)

/* identity is _id or slug */
router.route('/:id')
  .patch(updateComment)
  .delete(deleteComment);

router.patch('/:id/verified', verifiedComment);


export default router;
