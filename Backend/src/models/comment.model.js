import {Schema, model, Types} from "mongoose"

const commentSchema = new Schema({
    description: {
      type: String,
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  });
  
  export const Comment = model('Comment', commentSchema);
  
