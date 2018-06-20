import UserModel from "../models/userModel";
import PatientReportModel from "../models/patientReportModel";

export default {
  list(req, res, next) {
    console.log("req body inside the medHistoryListing", req.body);
    MedModel.find()
      .then(meds => {
        res.send({ medList: meds });
      })
      .catch(next);
  }
};
