import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const RecordModel = mongoose.model("experiment", RecordSchema);

export default RecordModel;
