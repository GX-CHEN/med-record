import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MedSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
});

const MedModel = mongoose.model("med", MedSchema);

export default MedModel;
