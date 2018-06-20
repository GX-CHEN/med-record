import PatientReportModel from "../models/patientReportModel";

/**
 * This controller handles the patient reporting for their medicine intake time
 */
export default {
  // .catch(next) help tell the actual error. This is part of Express Framework
  addTimeRecord(req, res, next) {
    console.log("inside addTimeRecord with request body", req.body);
    const patient_id = req.body.patient_id;
    const date_report = req.body.date_report;

    PatientReportModel.find({ patient_id }).then(result => {
      // If it's the first time a patient ever reported, we create an [dateString] associated with patientId
      if (result.length === 0) {
        PatientReportModel.create({ patient_id })
          .then(() => {
            PatientReportModel.update({ patient_id }, { $push: { date_report } }).then(result =>
              res.status(200).send(result)
            );
          })
          .catch(next);
      } else {
        PatientReportModel.findOne({ patient_id }, { _id: 0, date_report: 1 })
          .then(result => {
            if (result.date_report.includes(date_report)) {
              res.status(422).send("already reported for today");
            } else {
              PatientReportModel.update({ patient_id }, { $push: { date_report } })
                .then(result => res.status(200).send(result))
                .catch(next);
            }
          })
          .catch(next);
      }
    });
  },

  checkIfAlreadyReported(req, res, next) {
    console.log("inside checkIfAlreadyReported with request body", req.body);
    const patient_id = req.body.patient_id;
    const date_report = req.body.date_report;

    PatientReportModel.find({ patient_id }).then(result => {
      if (result.length === 0) {
        res.status(200).send(false);
      } else {
        PatientReportModel.findOne({ patient_id }, { _id: 0, date_report: 1 })
          .then(result => {
            if (result.date_report.includes(date_report)) {
              res.status(200).send(true);
            } else {
              res.status(200).send(false);
            }
          })
          .catch(next);
      }
    });
  }
};
