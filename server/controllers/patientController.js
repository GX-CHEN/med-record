import PatientReportModel from "../models/patientReportModel";

/**
 * This controller handles the patient reporting for their medicine intake time
 */
export default {
  // next help tell the actual error
  addTimeRecord(req, res, next) {
    console.log("inside addTimeRecord with request body", req.body);
    const patient_id = req.body.patient_id;
    const date_report = req.body.date_report;

    PatientReportModel.find({ patient_id }).then(result => {
      if (result.length === 0) {
        PatientReportModel.create({ patient_id })
          .then(() => {
            PatientReportModel.update(
              { patient_id },
              { $push: { date_report } }
            ).then(result => res.status(200).send(result));
          })
          .catch(next);
      } else {
        PatientReportModel.update({ patient_id }, { $push: { date_report } })
          .then(result => res.status(200).send(result))
          .catch(next);
      }
    });
  }
};
