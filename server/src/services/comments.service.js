import mongoose from 'mongoose';
import Comment from "../models/comment.model.js";

export default {
  getAllCommentsService,
  createCommentService,
  updateCommentService,
  verifiedCommentService,
  deleteCommentService
};

function getCommentFromRequest(req) {
  let comment = { product: req.body.product };
  
  if (req.body.author) { comment.author = req.body.author; }
  else { comment.anonymousAuthor = {}; }
  if (req.body.name) { comment.anonymousAuthor.name = req.body.name; }
  if (req.body.email) { comment.anonymousAuthor.email = req.body.email; }
  if (req.body.phone) { comment.anonymousAuthor.phone = req.body.phone; }
  if (req.body.content) { comment.content = req.body.content; }
  
  return comment;
}

async function getAllCommentsService(data) {
  const { product } = data;
  return await Comment.find({ product: product }).sort({ createdAt: -1 }).lean().exec();
}

async function createCommentService(req) {
  const comment = new Comment({
    _id: new mongoose.Types.ObjectId(),
    ...getCommentFromRequest(req)
  });
  return await comment.save();
}

async function updateCommentService(req) {
  const { id } = req.params;
  let updated = getCommentFromRequest(req);
  return Comment.findByIdAndUpdate(id, updated, {new: true});
}

async function verifiedCommentService(req) {
  const { id } = req.params;
  const status = req.body.status || false;
  return Comment.findByIdAndUpdate(id, {isVerified: status}, {new: true});
}

async function deleteCommentService(req) {
  const { id } = req.params;
  return Comment.findByIdAndRemove(id);
}