import {Schema, model, Types} from "mongoose"

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [
    {
      type: Types.ObjectId,
      ref: 'Comment',
    },
  ],
  imageURL: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Post = model('Post', postSchema);

