import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  patient_id: {
    type: String,
    required: true,
    unique: true
  },
  time: {
    type: [String]
    // with required = true, the array need
    // at least 1 element. Without, send nothing
    //and it will be empty
  }
});

const PatientModel = mongoose.model("patient", PatientSchema);

export default PatientModel;
