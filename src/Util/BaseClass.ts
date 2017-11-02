import Ids from '../Models/_ids';
import * as _ from 'lodash';
class BaseClass {
  idList: Array<string>;
  constructor() {
    this.idList = ['b_id'];
  }
  // id 自增
  async getId(type: string) {
    if (!_.includes(this.idList, type)) {
      console.log('id类型错误');
      throw new Error('id类型错误');
    }
    try {
      let msg;
      await Ids.findByIdAndUpdate(
        type,
        { $inc: { seq: 1 } }
      ).then((res: any) => {
        msg = res.seq;
      });
      return msg;
    } catch (err) {
      console.log('获取id失败');
      throw new Error(err);
    }
  }
  // 查询token信息
  async getIdByToken(state) {
    return state.uid;
  }
};

export default BaseClass;