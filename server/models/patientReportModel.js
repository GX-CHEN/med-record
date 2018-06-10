import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  patient_id: {
    type: String,
    required: true,
    unique: true
  },
  date_report: {
    type: [String],
    default: []
  }
});

const PatientReportModel = mongoose.model("patient", PatientSchema);

export default PatientReportModel;
