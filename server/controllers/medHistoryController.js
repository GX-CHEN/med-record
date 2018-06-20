import User from "../models/userModel";
import PatientReportModel from "../models/patientReportModel";
import { includes } from "lodash";

export default {
  async list(req, res, next) {
    const { dateString } = req.body;
    const patients = await User.find({});
    let results = patients.map(async patient => {
      const { _id, username } = patient;
      const record = await PatientReportModel.findOne({ patient_id: _id });
      if (record && includes(record.date_report, dateString)) {
        return { username, reported: true };
      } else {
        return { username, reported: false };
      }
    });

    Promise.all(results).then(tableData => {
      res.send({ tableData });
    });
  }
};
