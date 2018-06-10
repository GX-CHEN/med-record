import mongoose from "mongoose";
const Schema = mongoose.Schema;

/**
 * Medicine is on the end of dependency chain, so it only need a name
 * In order to differentiate different meds, they are required to be unique
 */
const MedSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const MedModel = mongoose.model("med", MedSchema);

export default MedModel;
