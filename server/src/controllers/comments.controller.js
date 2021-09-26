import mongoose from 'mongoose';
import Comment from '../models/comment.model.js';
import resUtils from '../utils/res-utils.js';

const getCommentFromRequest = (req) => {
  let comment = { product: req.body.product };

  if (req.body.author) { comment.author = req.body.author; }
  else { comment.anonymousAuthor = {}; }
  if (req.body.name) { comment.anonymousAuthor.name = req.body.name; }
  if (req.body.email) { comment.anonymousAuthor.email = req.body.email; }
  if (req.body.phone) { comment.anonymousAuthor.phone = req.body.phone; }
  if (req.body.content) { comment.content = req.body.content; }

  console.log(comment);

  return comment;
};


export const getComments = async (req, res) => {
  try {
    const { product } = req.body;

    let comments = await Comment.find({ product: product }).sort({ createdAt: -1 }).lean().exec();
    if (comments && comments.length > 0) {
      resUtils.status200(res, null, comments);
    } else {
      resUtils.status404(res, 'No comments found');
    }
  } catch (err) { resUtils.status500(res, err); }
}


export const createComment = async (req, res) => {
  try {
    const comment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      ...getCommentFromRequest(req)
    });

    const newComment = await comment.save();
    resUtils.status201(res, `Create NEW comment successfully!`, newComment);
  } catch (err) { resUtils.status500(res, err); }
}


export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    let updated = getCommentFromRequest(req);
    const updatedComment = await Comment.findByIdAndUpdate(id, updated, { new: true });
    if (updatedComment) {
      resUtils.status200(res, `Update comment successfully!`, updatedComment);
    } else {
      resUtils.status404(res, `Comment '${identity}' not found!`);
    }
  } catch (err) { resUtils.status500(res, err); }
}


export const verifiedComment = async (req, res) => {
  try {
    const { id } = req.params;
    const status = req.body.status || false;

    const updatedComment = await Comment.findByIdAndUpdate(id, { isVerified: status }, { new: true });

    if (updatedComment) {
      let message = status ? 'Verified comment successfully!' : 'Unverified comment successfully!';
      resUtils.status200(res, message, updatedComment);
    } else {
      resUtils.status404(res, `Comment '${id}' not found!`);
    }
  }
  catch (err) { resUtils.status500(res, err); }
}


export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndRemove(id);
    if (deletedComment) {
      resUtils.status204(res, `Deleted comment successfully!`, deletedComment);
    } else {
      resUtils.status404(res, `Comment '${id}' not found!`);
    }
  }
  catch (err) { resUtils.status500(res, err); }
}
