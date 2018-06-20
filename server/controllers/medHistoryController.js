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
        return { key: _id, username, reported: "Yes" };
      } else {
        return { key: _id, username, reported: "No" };
      }
    });

    Promise.all(results).then(tableData => {
      res.send({ tableData });
    });
  }
};
