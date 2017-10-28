import * as Mongoose from 'mongoose';
const IdsSchema = new Mongoose.Schema({
  _id: {type: String, required: true},
  seq: { type: Number, default: 0 }
});

const Ids = Mongoose.model('allId', IdsSchema);

export default Ids;
