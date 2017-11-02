import * as Mongoose from "mongoose";
import BlogModel from './blog';
import Ids from '../_ids';
import { XBlog } from './blog';

class BlogStore {

  constructor() {
    console.log('this is BlogStore');
  };
  
  /**
   * @description 返回详情
   * 
   * @memberof BlogStore
   */
  getBlogById = async (_id: number): Promise<any> => {
    const blog = await BlogModel.findOne({
      bid: _id
    });
    return blog;
  } 

  getBlogList = async (page: number = 1): Promise<any> => {

  }
  newBlog = async (_blog: XBlog): Promise<any> => {
    let blog: XBlog = _blog;
    blog._id = await this.getId();
    console.log(blog);
    const res = await BlogModel.create(blog);
    console.log(res);
  }

  getId = async () => {
    try {
      const msg = await Ids.findByIdAndUpdate('u_id', { $inc: { seq: 1 } });
      return msg;

    } catch (err) {
      console.log('获取id失败');
      throw new Error(err);
    }
  }
}


const blogStore = new BlogStore();
export default blogStore;