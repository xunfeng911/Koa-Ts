import * as Mongoose from 'mongoose';
import { required } from '../../middleware/route/decorator';

export interface XBlog extends Mongoose.Document {
  blog_name: string;
  blog_tags?: string[];
  blog_views: number;
  blog_brief: string;
  blog_cont: string;
  blog_id?: number;
};

export const XBlogSchema = new Mongoose.Schema({
  blog_id: {
    type: Number,
    unique: true,
    required: true
  },
  blog_name: {
    type: String,
    unique: true,
    required: true
  },
  blog_tags: {
    type: Array,
    required: false
  },
  blog_views: {
    type: Number,
    required: true
  },
  blog_brief: {
    type: String,
    required: true
  },
  blog_cont: {
    type: String,
    required: true
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
},
  {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
  });

const _BlogModel = Mongoose.model<XBlog>('blog', XBlogSchema);

const BlogModel = Mongoose.model('blog');

export default BlogModel;