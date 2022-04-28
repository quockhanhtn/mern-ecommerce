import ResponseUtils from '../utils/ResponseUtils.js';
import commentService from '../services/comments.service.js'

export const getComments = async (req, res, next) => {
  try {
    let comments = await commentService.getAllCommentsService(req.params);
    if (comments && comments.length > 0) {
      ResponseUtils.status200(res, 'Get all comments', comments);
    } else {
      ResponseUtils.status404(res, 'No comments found');
    }
  } catch (err) { next(err); }
}

export const createComment = async (req, res, next) => {
  try {
    const newComment = await commentService.createCommentService(req);
    ResponseUtils.status201(res, `Create NEW comment successfully!`, newComment);
  } catch (err) { next(err); }
}

export const updateComment = async (req, res, next) => {
  try {
    const updatedComment = await commentService.updateCommentService(req);
    if (updatedComment) {
      ResponseUtils.status200(res, `Update comment successfully!`, updatedComment);
    } else {
      ResponseUtils.status404(res, `Comment not found!`);
    }
  } catch (err) { next(err); }
}

export const verifiedComment = async (req, res, next) => {
  try {
    const updatedComment = await commentService.verifiedCommentService(req);
    if (updatedComment) {
      let message = status ? 'Verified comment successfully!' : 'Unverified comment successfully!';
      ResponseUtils.status200(res, message, updatedComment);
    } else {
      ResponseUtils.status404(res, `Comment not found!`);
    }
  } catch (err) { next(err); }
}

export const deleteComment = async (req, res, next) => {
  try {
    const deletedComment = await commentService.deleteCommentService(req);
    if (deletedComment) {
      ResponseUtils.status204(res, `Deleted comment successfully!`, deletedComment);
    } else {
      ResponseUtils.status404(res, `Comment not found!`);
    }
  } catch (err) { next(err); }
}
