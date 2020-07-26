import mongoose from 'mongoose';
import moment from 'moment';
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  search: String,
  budget: String,
  name: String,
  email: String,
  phone: String,
  status:String,
  date: {
    type: String, 
    default: () => moment().format("DD-MM-YYYY")
  }
})

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;