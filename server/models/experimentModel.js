import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ExperimentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const ExperimentModel = mongoose.model("experiment", ExperimentSchema);

export default ExperimentModel;
